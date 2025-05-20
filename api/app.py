from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Allow front-end requests (for Day 4)
load_dotenv()

@app.route('/api/recognize', methods=['POST'])
def recognize_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    image = request.files['image']
    # Mock response until TensorFlow.js integration on Day 4
    return jsonify({'label': 'sneaker', 'confidence': 0.95})

@app.route('/')
def home():
    return 'Image Recognition API'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('FLASK_ENV') == 'development')