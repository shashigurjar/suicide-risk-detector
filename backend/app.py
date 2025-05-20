from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from transformers import pipeline as hf_pipeline
import numpy as np
import logging
from logging.handlers import RotatingFileHandler
import traceback
import pickle

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
handler = RotatingFileHandler('app.log', maxBytes=10000, backupCount=3)
handler.setFormatter(logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
))
app.logger.addHandler(handler)
app.logger.setLevel(logging.DEBUG)  # Changed to DEBUG for more detailed logs

# Global variables
model = None
tokenizer = None
sentiment_analyzer = None

def load_resources():
    """Load model, tokenizer, and sentiment analyzer"""
    global model, tokenizer, sentiment_analyzer
    
    try:
        # Load model
        app.logger.info("Loading model...")
        model = load_model('new.h5')
        app.logger.info(f"Model loaded. Input shape: {model.input_shape}")
        
        # Load tokenizer
        app.logger.info("Loading tokenizer...")
        with open('tokenizer.pkl', 'rb') as f:
            tokenizer = pickle.load(f)
        app.logger.info("Tokenizer loaded successfully")
        
        # Load sentiment analyzer
        app.logger.info("Loading sentiment analyzer...")
        sentiment_analyzer = hf_pipeline("sentiment-analysis", 
                                       model="distilbert-base-uncased-finetuned-sst-2-english")
        app.logger.info("Sentiment analyzer loaded")

    except Exception as e:
        app.logger.critical(f"Resource loading failed: {str(e)}")
        app.logger.critical(traceback.format_exc())
        raise

def get_sentiment(text):
    """Get sentiment analysis results with detailed logging"""
    try:
        result = sentiment_analyzer(text)[0]
        app.logger.debug(f"Sentiment raw result: {result}")
        return result['label'], result['score']
    except Exception as e:
        app.logger.error(f"Sentiment analysis failed: {str(e)}")
        return "NEUTRAL", 0.5

def final_prediction(text, model_score):
    """Improved decision logic with multiple risk levels"""
    try:
        sentiment_label, sentiment_score = get_sentiment(text)
        app.logger.debug(f"Final prediction inputs - Model: {model_score:.2f}, Sentiment: {sentiment_label} ({sentiment_score:.2f})")

        # Decision logic
        if sentiment_label == "POSITIVE":
            if sentiment_score > 0.95:
                return {
                    "final_result": "not suicidal",
                    "risk_level": "none",
                    "sentiment_label": sentiment_label,
                    "sentiment_score": float(sentiment_score)
                }
            if model_score > 0.4:
                return {
                    "final_result": "Contradiction warning",
                    "risk_level": "medium",
                    "sentiment_label": sentiment_label,
                    "sentiment_score": float(sentiment_score)
                }
            return {
                "final_result": "Not suicidal",
                "risk_level": "none",
                "sentiment_label": sentiment_label,
                "sentiment_score": float(sentiment_score)
            }
            
        elif sentiment_label == "NEGATIVE":
            if model_score > 0.8:
                return {
                    "final_result": "Immediate concern",
                    "risk_level": "critical",
                    "sentiment_label": sentiment_label,
                    "sentiment_score": float(sentiment_score)
                }
            elif model_score > 0.6:
                return {
                    "final_result": "High risk",
                    "risk_level": "high",
                    "sentiment_label": sentiment_label,
                    "sentiment_score": float(sentiment_score)
                }
            elif model_score > 0.4:
                return {
                    "final_result": "Potential risk",
                    "risk_level": "medium",
                    "sentiment_label": sentiment_label,
                    "sentiment_score": float(sentiment_score)
                }
            else:
                return {
                    "final_result": "Low risk",
                    "risk_level": "low",
                    "sentiment_label": sentiment_label,
                    "sentiment_score": float(sentiment_score)
                }
                
        else:
            return {
                "final_result": "Neutral",
                "risk_level": "none",
                "sentiment_label": sentiment_label,
                "sentiment_score": float(sentiment_score)
            }
        
    except Exception as e:
        app.logger.error(f"Final prediction failed: {str(e)}")
        return {"error": "Prediction combination failed"}

@app.route('/predict', methods=['POST'])
def predict():
    """Main prediction endpoint with enhanced logging"""
    try:
        app.logger.info("Received prediction request")
        
        if not request.is_json:
            return jsonify({'error': 'Request must be JSON'}), 400
            
        data = request.get_json()
        if 'text' not in data:
            return jsonify({'error': 'Missing text field'}), 400
            
        text = data['text']
        app.logger.debug(f"Raw input text: {text}")

        processed = preprocess_text(text)
        app.logger.debug(f"Processed text shape: {processed.shape}")
        
        prediction = model.predict(processed)
        model_score = float(prediction[0][0])
        app.logger.info(f"Model score: {model_score:.4f}")
        
        combined = final_prediction(text, model_score)
        
        return jsonify({
            'suicidal': bool(model_score > 0.75),
            'model_confidence': model_score,
            **combined
        })
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        app.logger.error(f"Prediction error: {traceback.format_exc()}")
        return jsonify({'error': 'Internal server error'}), 500

def preprocess_text(text):
    """Enhanced preprocessing with OOV handling"""
    try:
        if not isinstance(text, str) or len(text.strip()) == 0:
            raise ValueError("Invalid input text")
            
        sequences = tokenizer.texts_to_sequences([text])
        app.logger.debug(f"Raw sequences: {sequences}")
        
        if not sequences or len(sequences[0]) == 0:
            app.logger.warning("Empty sequence generated - using fallback")
            sequences = [[tokenizer.oov_token_id or 1]]  # Fallback for empty sequences
            
        padded = pad_sequences(sequences, maxlen=40)
        return padded
    except Exception as e:
        app.logger.error(f"Preprocessing failed: {str(e)}")
        raise

@app.route('/health', methods=['GET'])
def health_check():
    """Enhanced health check"""
    try:
        test_text = "System health check"
        processed = preprocess_text(test_text)
        prediction = model.predict(processed)
        return jsonify({
            'status': 'healthy',
            'model_ready': True,
            'sentiment_ready': sentiment_analyzer is not None
        })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e),
            'model_ready': model is not None,
            'sentiment_ready': sentiment_analyzer is not None
        }), 500

# Load resources after defining all components
load_resources()

if __name__ == '__main__':
    app.logger.info("Starting Suicide Risk Assessment API")
