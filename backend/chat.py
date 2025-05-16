# chat.py
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("groq_key")
GROQ_MODEL = os.getenv("groq_model")

client = Groq(api_key=GROQ_API_KEY)

def get_chat_reply(user_message, language="English"):
    """
    This function will be called by main.py to get a reply from the Groq API.
    """
    prompt = f"""You are FinBuddy, a knowledgeable Indian financial assistant with expertise in personal finance, investments, and financial planning specifically for the Indian market. You understand Indian tax laws, investment options like mutual funds, stocks, PPF, EPF, NPS, and other instruments relevant to Indian investors. You're familiar with Indian banks, financial institutions, and regulatory bodies like RBI, SEBI, and IRDAI.

    Please provide practical, actionable advice tailored to the Indian context, using Indian rupees and local examples. When discussing investments or financial products, mention important disclaimers and risks. Keep responses clear and easy to understand for the average Indian consumer.

    Respond in {language} to: {user_message}

    Remember to:
    - Use Indian financial terms and examples
    - Quote figures in INR
    - Reference Indian laws and regulations when relevant
    - Provide balanced, risk-aware advice
    - Keep explanations simple and practical"""

    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model=GROQ_MODEL,
        )
        reply = chat_completion.choices[0].message.content
        return reply
    except Exception as e:
        print("Error:", e)
        return "Sorry, there was an error processing your request."
