from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

LANGFLOW_URL = os.getenv("LANGFLOW_URL")
LANGFLOW_ID = os.getenv("LANGFLOW_ID")
ENDPOINT = os.getenv("ENDPOINT")
ASTRA_DB_KEY = os.getenv("ASTRA_DB_KEY")

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # API Endpoint URL
    api_url = f"{LANGFLOW_URL}/lf/{LANGFLOW_ID}/api/v1/run/{ENDPOINT}"
    payload = {
        "input_value": user_message,
        "output_type": "chat",
        "input_type": "chat",
    }
    headers = {
        "Authorization": f"Bearer {ASTRA_DB_KEY}",
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(api_url, json=payload, headers=headers)
        if response.status_code == 200:
            data = response.json()
            reply = data.get("outputs", [{}])[0].get("outputs", [{}])[0].get("results", {}).get("message", {}).get("text", "Sorry, I didn't understand that.")
            return jsonify({"reply": reply})
        else:
            return jsonify({"error": response.json()}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

