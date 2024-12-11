import google.generativeai as genai
genai.configure(api_key="AIzaSyBQZCfzDz20oSYmw61vOdPLzE8qV64UPiw")
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(
    history=[
        {"role": "user", "parts": "Hello"},
        {"role": "model", "parts": "Great to meet you. What would you like to know?"},
    ]
)

response = chat.send_message("how old am I?")

print(response.text)
