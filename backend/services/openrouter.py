import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

def ask_ai(context, question):
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "system", "content": f"You are Shubham's portfolio assistant. Answer only from this resume:\n{context}"},
                {"role": "user", "content": question}
            ]
        }
    )
    return response.json()["choices"][0]["message"]["content"]