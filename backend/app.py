from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load model directly
model_filename = './model/spam_detection_modell.pkl'
try:
    clf = joblib.load(model_filename)
    logger.info("Model loaded successfully.")
except FileNotFoundError:
    logger.error(f"Model file not found at path: {model_filename}")
    clf = None
except Exception as e:
    logger.error(f"Error loading model: {e}")
    clf = None

@app.route('/predict', methods=['POST'])
def predict():
    if clf is None:
        logger.error("Model not loaded.")
        return jsonify({'error': 'Model not loaded'}), 500

    # Validate JSON and retrieve emails
    if not request.is_json:
        logger.error("Invalid JSON format")
        return jsonify({'error': 'Invalid JSON format'}), 400

    try:
        data = request.get_json()
        emails = data.get('emails', [])
        if not emails:
            logger.error("No emails provided")
            return jsonify({'error': 'No emails provided'}), 400

        predictions = clf.predict(emails)
        results = ['It is a Spam Email' if pred == 1 else 'Original Mail' for pred in predictions]
        logger.info(f"Predictions: {results}")
        return jsonify({'predictions': results})

    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        return jsonify({'error': f'Prediction failed: {e}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
