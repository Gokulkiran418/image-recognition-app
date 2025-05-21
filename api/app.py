from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PIL import Image
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions

app = Flask(__name__)
CORS(app)
load_dotenv()

# Load MobileNetV2 model
model = MobileNetV2(weights='imagenet')

@app.route('/api/recognize', methods=['POST'])
def recognize_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    image_file = request.files['image']
    try:
        # Preprocess image
        image = Image.open(image_file).convert('RGB').resize((224, 224))
        image_array = np.array(image)
        image_array = np.expand_dims(image_array, axis=0)
        image_array = preprocess_input(image_array)

        # Predict
        predictions = model.predict(image_array)
        decoded = decode_predictions(predictions, top=1)[0][0]
        label = decoded[1]
        confidence = float(decoded[2])

        return jsonify({'label': label, 'confidence': confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def home():
    return 'Image Recognition API'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('FLASK_ENV') == 'development')