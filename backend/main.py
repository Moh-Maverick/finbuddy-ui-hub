# main.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from cibil import parse_uploaded_file
from firebase_db import log_cibil_score, get_cibil_score_history, add_emi_reminder, get_emi_reminders, delete_emi_reminder

app = Flask(__name__)
CORS(app)  # Allows frontend (React) to access backend

@app.route('/api/upload', methods=['POST'])
def upload_file():
    print("\n=== New File Upload Request ===")
    
    if 'file' not in request.files:
        print("❌ No file in request")
        return jsonify({
            'score': 0,
            'status': 'error',
            'message': 'No file uploaded'
        }), 400

    file = request.files['file']
    if file.filename == '':
        print("❌ Empty filename")
        return jsonify({
            'score': 0,
            'status': 'error',
            'message': 'No file selected'
        }), 400

    try:
        print(f"\n🔍 Processing file: {file.filename}")
        result = parse_uploaded_file(file)
        print("\n=== Processing Result ===")
        print(f"Status: {result['status']}")
        print(f"Score: {result['score']}")
        print(f"Message: {result['message']}")
        print("=== End of Processing ===\n")

        # Log to Firebase if successful
        if result['status'] == 'success' and result['score']:
            user_id = 'demo_user'  # TODO: Replace with real user id from auth
            log_cibil_score(user_id, result['score'], {"message": result['message']})

        return jsonify(result)
    except Exception as e:
        print(f"\n❌ Error in upload handler: {str(e)}")
        return jsonify({
            'score': 0,
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/cibil-history', methods=['GET'])
def get_cibil_history():
    user_id = 'demo_user'  # TODO: Replace with real user id from auth
    history = get_cibil_score_history(user_id)
    # Convert Firestore timestamps to ISO strings
    for entry in history:
        if entry['timestamp']:
            entry['timestamp'] = entry['timestamp'].isoformat()
    return jsonify(history)

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

if __name__ == '__main__':
    print("\n=== CIBIL Score Extraction Server ===")
    print("Server is running on http://localhost:5000")
    print("Ready to process PDF files...")
    app.run(debug=True)
