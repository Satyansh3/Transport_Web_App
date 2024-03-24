from flask import Flask, request, jsonify
import base64
from flask_cors import CORS
from io import BytesIO
from object_detection import detect_objects

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/detect-objects', methods=['POST'])

def function_object_detection():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 404
    
    image = request.files['image']
    image_base = base64.b64encode(image.read()).decode('utf-8')

    arr, processed_image = detect_objects(image_base)

    return jsonify({'objects_detected': arr, 'processed_image': processed_image}), 200

if __name__ == '__main__':
    app.run(host='localhost' , port=5000, debug=True)