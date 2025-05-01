from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
import cv2
from emotion_recognizer import EmotionRecognizer
import datetime
import urllib.parse
import numpy as np
from PIL import Image
import io
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

client = MongoClient(os.getenv("MONGODB_URI"))
db = client.moodmusic
users_collection = db.users

emotion_recognizer = EmotionRecognizer()
camera = cv2.VideoCapture(0)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

# Map detected emotions to alternate search terms
EMOTION_MAPPING = {
    "sad": "happy",
    "happy": "party",
    "angry": "calm relaxing",
    "neutral": "calm motivation"
}

def fetch_youtube_videos(query, max_results=25):
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": f"{query} songs",
        "type": "video",
        "maxResults": max_results,
        "key": YOUTUBE_API_KEY
    }
    response = requests.get(url, params=params)
    data = response.json()
    videos = []
    for item in data.get("items", []):
        video_id = item["id"]["videoId"]
        title = item["snippet"]["title"]
        thumbnail = item["snippet"]["thumbnails"]["high"]["url"]
        videos.append({
            "videoId": video_id,
            "title": title,
            "thumbnail": thumbnail
        })
    return videos

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"message": "Username already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({
        "username": username,
        "password": hashed_password,
        "history": []
    })

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = users_collection.find_one({"username": username})

    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({
        "token": access_token,
        "username": username,
        "message": "Login successful!"
    }), 200

@app.route("/api/detect_emotion", methods=["POST"])
def detect_emotion():
    success, frame = camera.read()
    if not success:
        return jsonify({"error": "Could not capture image"}), 500

    emotion = emotion_recognizer.predict_emotion(frame)
    print(f"[INFO] Detected Emotion: {emotion}")

    # Apply mapping before fetching videos
    query = EMOTION_MAPPING.get(emotion.lower(), emotion)
    videos = fetch_youtube_videos(query)
    return jsonify({"emotion": emotion, "videos": videos})

@app.route("/api/detect_emotion_from_image", methods=["POST"])
def detect_emotion_from_image():
    if "image" not in request.files:
        return jsonify({"error": "No image part in the request"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        image_bytes = file.read()
        pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        cv_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
        emotion = emotion_recognizer.predict_emotion(cv_image)
        print(f"[INFO] Emotion from upload: {emotion}")

        # Apply mapping for image-based detection
        query = EMOTION_MAPPING.get(emotion.lower(), emotion)
        videos = fetch_youtube_videos(query)
        return jsonify({"emotion": emotion, "videos": videos})
    except Exception as e:
        print("[ERROR]", e)
        return jsonify({"error": "Failed to process image"}), 500

@app.route("/api/video_feed")
def video_feed():
    def generate_frames():
        while True:
            success, frame = camera.read()
            if not success:
                break
            _, buffer = cv2.imencode(".jpg", frame)
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n"
                + buffer.tobytes()
                + b"\r\n"
            )

    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )

@app.route("/api/save_emotion", methods=["POST"])
@jwt_required()
def save_emotion():
    current_user = get_jwt_identity()
    data = request.get_json()
    emotion = data.get("emotion")
    if not emotion:
        return jsonify({"error": "Emotion data is required"}), 400

    history_entry = {"mood": emotion, "date": datetime.datetime.utcnow()}
    users_collection.update_one(
        {"username": current_user},
        {"$push": {"history": history_entry}}
    )
    return jsonify({"message": "Emotion history saved successfully"})

@app.route("/api/history", methods=["GET"])
@jwt_required()
def get_history():
    current_user = get_jwt_identity()
    user = users_collection.find_one(
        {"username": current_user},
        {"history": 1, "_id": 0}
    )
    return jsonify(user["history"] if user else [])

@app.route("/api/share_mood", methods=["POST"])
@jwt_required()
def share_mood():
    current_user = get_jwt_identity()
    user = users_collection.find_one(
        {"username": current_user},
        {"history": 1, "_id": 0}
    )
    if not user or not user.get("history"):
        return jsonify({"error": "No mood history found"}), 404

    latest_mood = user["history"][-1]["mood"]
    share_text = (
        f"I just felt {latest_mood}! 🎵 #MoodMusic\n"
        "Try Moodmusic at https://moodmusic.xo"
    )
    encoded = urllib.parse.quote_plus(share_text)
    social_links = {
        "twitter": f"https://twitter.com/intent/tweet?text={encoded}",
        "facebook": f"https://www.facebook.com/sharer/sharer.php?u=https://moodmusic.xo&quote={encoded}",
        "whatsapp": f"https://api.whatsapp.com/send?text={encoded}"
    }
    return jsonify(social_links)

if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=8000,
        use_reloader=False
    )
    