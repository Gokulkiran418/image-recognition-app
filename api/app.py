from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PIL import Image
import os
import io

app = Flask(__name__)
CORS(app)
load_dotenv()

@app.route('/api/recognize', methods=['POST'])
def recognize_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    image_file = request.files['image']
    try:
        # Preprocess image
        image = Image.open(image_file).convert('RGB').resize((224, 224))  # MobileNet input size
        # Save for testing (remove in production)
        image.save('temp.jpg', 'JPEG')
        # Mock response until TensorFlow.js integration
        return jsonify({'label': 'sneaker', 'confidence': 0.95})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def home():
    return 'Image Recognition API'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('FLASK_ENV') == 'development')