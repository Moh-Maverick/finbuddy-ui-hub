import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Initialize Firebase only once
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_key.json")  # 🔐 Replace with your key file
    firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

# Log a single message
def log_message(role, message, session_id="default"):
    chat_ref = db.collection("chat_sessions").document(session_id).collection("messages")
    chat_ref.add({
        "role": role,
        "message": message,
        "timestamp": firestore.SERVER_TIMESTAMP  # Optional timestamp
    })

# Get full chat history for a session
def get_conversation(session_id="default"):
    chat_ref = db.collection("chat_sessions").document(session_id).collection("messages")
    docs = chat_ref.order_by("timestamp").stream()

    conversation = []
    for doc in docs:
        data = doc.to_dict()
        role = data.get("role")
        message = data.get("message")
        if role and message:
            conversation.append({"role": role, "content": message})
    return conversation
