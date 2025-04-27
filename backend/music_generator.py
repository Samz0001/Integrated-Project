import random

class MusicGenerator:
    def __init__(self):
       
        self.chord_progressions = {
            "happy":    ["C", "G", "Am", "F"],
            "sad":      ["Dm", "Am", "E", "F"],
            "angry":    ["Gm", "Bb", "Eb", "F"],
            "surprise": ["C", "Em", "F", "G"],
            "neutral":  ["C", "F", "G"]
        }

    def generate_music(self, emotion):
      n
        progression = self.chord_progressions.get(emotion, self.chord_progressions["neutral"])
        return " - ".join(progression)