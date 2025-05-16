# main.py
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from cibil import parse_uploaded_file
from chat import get_chat_reply  # Import chat functionality
from firebase_db import log_cibil_score, get_cibil_score_history, add_emi_reminder, get_emi_reminders, delete_emi_reminder

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing

# Route for CIBIL score upload
@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({
            'score': 0,
            'status': 'error',
            'message': 'No file uploaded'
        }), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({
            'score': 0,
            'status': 'error',
            'message': 'No file selected'
        }), 400

    try:
        result = parse_uploaded_file(file)
        return jsonify(result)
    except Exception as e:
        return jsonify({
            'score': 0,
            'status': 'error',
            'message': str(e)
        }), 500

# Route for Chat functionality
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")
    language = data.get("language", "English")

    # Call to the chat.py function
    reply = get_chat_reply(user_message, language)

    return jsonify({"reply": reply})

# CIBIL score history route
@app.route('/api/cibil-history', methods=['GET'])
def get_cibil_history():
    user_id = 'demo_user'  # Replace with real user id from auth
    history = get_cibil_score_history(user_id)
    # Convert Firestore timestamps to ISO strings
    for entry in history:
        if entry['timestamp']:
            entry['timestamp'] = entry['timestamp'].isoformat()
    return jsonify(history)

# EMI reminder routes
@app.route('/api/emi-reminder', methods=['POST'])
def api_add_emi_reminder():
    user_id = 'bozoswildin@gmail.com'
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    reminder_id = add_emi_reminder(user_id, data)
    return jsonify({'id': reminder_id}), 201

@app.route('/api/emi-reminder', methods=['GET'])
def api_get_emi_reminders():
    user_id = 'bozoswildin@gmail.com'
    reminders = get_emi_reminders(user_id)
    return jsonify(reminders)

@app.route('/api/emi-reminder/<reminder_id>', methods=['DELETE'])
def api_delete_emi_reminder(reminder_id):
    user_id = 'bozoswildin@gmail.com'
    delete_emi_reminder(user_id, reminder_id)
    return jsonify({'success': True})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
