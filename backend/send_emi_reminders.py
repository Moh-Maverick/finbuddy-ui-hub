import firebase_admin
from firebase_admin import credentials, firestore
import smtplib
from email.mime.text import MIMEText
from datetime import datetime

# Initialize Firebase
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Email config
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "mr95291151@gmail.com"  # Your Gmail address
EMAIL_PASSWORD = "rfsxjyyocmbiguwf"    # App Password, no spaces!

def send_email(to_email, subject, body):
    print(f"Preparing to send email to: {to_email}")
    msg = MIMEText(body, "html")
    msg["Subject"] = subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.set_debuglevel(1)  # Print SMTP conversation
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")

def check_and_send_reminders():
    users_ref = db.collection("users").stream()
    today = datetime.now().date()
    print(f"Today's date: {today}")

    for user_doc in users_ref:
        user_id = user_doc.id
        email = user_id  # In your setup, user_id is the email

        reminders_ref = db.collection("users").document(user_id).collection("emi_reminders").stream()
        for reminder_doc in reminders_ref:
            reminder = reminder_doc.to_dict()
            print(f"Checking reminder: {reminder}")
            if not reminder.get("nextDue"):
                print("No nextDue, skipping.")
                continue
            try:
                due_date = datetime.strptime(reminder["nextDue"], "%Y-%m-%d").date()
            except Exception as e:
                print(f"Error parsing date {reminder['nextDue']}: {e}")
                continue
            print(f"Due date: {due_date}, Today: {today}")
            if due_date <= today:
                subject = f"EMI Reminder: {reminder['loanType']} is due!"
                body = f"""
                <p>Your EMI for <b>{reminder['loanType']}</b> at <b>{reminder['bankName']}</b> is due on <b>{reminder['nextDue']}</b>.<br>
                Amount: <b>₹{reminder['amount']}</b></p>
                """
                print(f"Sending reminder to {email}")
                send_email(email, subject, body)
                print(f"Sent reminder to {email} for {reminder['loanType']}")
            else:
                print("Not due yet, skipping.")

if __name__ == '__main__':
    
    check_and_send_reminders() 