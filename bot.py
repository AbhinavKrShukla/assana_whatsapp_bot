import time
import requests
import qrcode_terminal
from whatsapp_web import WhatsApp

# Function to send a message back to a specific number
def send_message(message, to_number):
    try:
        WhatsApp.send_message(to_number, message)
    except Exception as e:
        print(f"Error sending message: {e}")

# Function to get response from your API
def get_api_response(user_id, user_message):
    try:
        response = requests.get('http://103.231.86.182:5000/query/', params={'user_id': user_id, 'question': user_message})
        return response.json().get('response', '❌ No response field in API.')
    except Exception as e:
        print(f"API Error: {e}")
        return "⚠️ I'm sorry, there was a temporary issue reaching our system. Please try again in a few moments. If the problem persists, feel free to call us at +91 4435057120 or +91 9384017122 for assistance."

# WhatsApp client initialization
class WhatsAppBot:
    def __init__(self):
        self.client = WhatsApp()

    def on_qr(self, qr):
        print('📱 Scan this QR with WhatsApp:')
        qrcode_terminal.draw(qr)  # Display QR code in terminal

    def on_ready(self):
        print('✅ WhatsApp bot is ready!')

    def on_message(self, msg):
        user_message = msg.body
        user_number = msg.from_user  # Extract the sender's phone number
        user_id = 222  # Example user ID (can be mapped or extracted dynamically)

        answer = get_api_response(user_id, user_message)
        send_message(answer, user_number)  # Send reply back to the sender

# Simulated main loop for WhatsApp bot
def main():
    # Initialize WhatsApp bot
    bot = WhatsAppBot()

    # Simulate checking WhatsApp connection
    while True:
        if bot.client.is_logged_in():
            bot.on_ready()
            break
        time.sleep(1)
    
    # Simulate receiving and responding to messages
    while True:
        # Wait for messages and simulate the response handling
        bot.client.listen_for_messages()  # Implement message listening mechanism in the client

if __name__ == "__main__":
    main()
