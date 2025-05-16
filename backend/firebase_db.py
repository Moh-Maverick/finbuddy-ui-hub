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

def log_cibil_score(user_id, score, extra_info=None):
    """
    Store a CIBIL score entry for a user in Firestore, with timestamp and optional extra info.
    """
    entry = {
        "score": score,
        "timestamp": firestore.SERVER_TIMESTAMP
    }
    if extra_info:
        entry.update(extra_info)
    db.collection("users").document(user_id).collection("cibil_scores").add(entry)

def get_cibil_score_history(user_id):
    """
    Fetch all CIBIL score entries for a user, ordered by timestamp ascending.
    Returns a list of dicts with score and timestamp.
    """
    scores_ref = db.collection("users").document(user_id).collection("cibil_scores").order_by("timestamp")
    docs = scores_ref.stream()
    history = []
    for doc in docs:
        data = doc.to_dict()
        history.append({
            "score": data.get("score"),
            "timestamp": data.get("timestamp")
        })
    return history

def add_emi_reminder(user_id, reminder_data):
    """
    Add a new EMI reminder for a user. Returns the new reminder's Firestore ID.
    """
    doc_ref = db.collection("users").document(user_id).collection("emi_reminders").add(reminder_data)
    return doc_ref[1].id  # add() returns (update_time, ref)

def get_emi_reminders(user_id):
    """
    Fetch all EMI reminders for a user, ordered by nextDue ascending.
    """
    reminders_ref = db.collection("users").document(user_id).collection("emi_reminders").order_by("nextDue")
    docs = reminders_ref.stream()
    reminders = []
    for doc in docs:
        data = doc.to_dict()
        data['id'] = doc.id
        reminders.append(data)
    return reminders

def delete_emi_reminder(user_id, reminder_id):
    """
    Delete an EMI reminder by ID for a user.
    """
    db.collection("users").document(user_id).collection("emi_reminders").document(reminder_id).delete()
