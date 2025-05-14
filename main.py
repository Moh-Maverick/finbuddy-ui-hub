import os
from dotenv import load_dotenv
from langdetect import detect
from deep_translator import GoogleTranslator
from groq import Groq
from firebase_db import log_message, get_conversation  # 🔥 Firebase Firestore integration

# 🔐 Load API Key
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# 🌍 Detect language
def detect_language(text):
    lang = detect(text)
    print(f"[INFO] Detected language: {lang}")
    return lang

# 🔁 Translate to English (if needed)
def translate_to_english(text, lang):
    if lang != 'en':
        return GoogleTranslator(source=lang, target='en').translate(text)
    return text

# 🔁 Translate from English to original language
def translate_from_english(text, lang):
    if lang != 'en':
        return GoogleTranslator(source='en', target=lang).translate(text)
    return text

# 🧠 Ask Groq LLaMA model (with Firestore memory)
def ask_llama(user_input_en, session_id="default"):
    log_message("user", user_input_en, session_id)

    # Build full chat history
    history = [{"role": "system", "content": "You are a helpful financial assistant. Answer questions about account balance, loans, interest, and fraud clearly."}]
    history += get_conversation(session_id)

    response = client.chat.completions.create(
        messages=history,
        model="llama3-70b-8192",
    )

    reply = response.choices[0].message.content
    log_message("assistant", reply, session_id)

    return reply

# 💬 Chat Loop
if __name__ == "__main__":
    session_id = input("Enter session ID (or press Enter to use default): ").strip() or "default"
    print("💬 Start chatting with your multilingual financial assistant! (type 'exit' or 'quit' to end)")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            print("👋 Goodbye!")
            break

        try:
            lang = detect_language(user_input)
            input_en = translate_to_english(user_input, lang)
            reply_en = ask_llama(input_en, session_id=session_id)
            reply_local = translate_from_english(reply_en, lang)
            print(f"Bot ({lang}): {reply_local}")
        except Exception as e:
            print(f"[ERROR] {e}")
