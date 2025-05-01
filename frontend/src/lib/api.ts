// src/lib/api.ts

/**
 * saveEmotion sends the detected emotion and its intensity to your Flask backend.
 * The backend expects a POST to /api/save_emotion with a Bearer JWT in the Authorization header.
 */
export async function saveEmotion(
    emotion: string,
    intensity: number
  ): Promise<{ data?: any; error?: string }> {
    try {
      // Attempt to read token from localStorage (set on login)
      const token = localStorage.getItem('token');
  
      const response = await fetch('/api/save_emotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ emotion, intensity }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        return { error: result.message || 'Failed to save emotion' };
      }
  
      return { data: result };
    } catch (err: any) {
      return { error: err.message || 'Network error' };
    }
  }
  