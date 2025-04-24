const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client();

client.on('qr', qr => {
  console.log('📱 Scan this QR with WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp bot is ready!');
});

client.on('message', async msg => {
    const userMessage = msg.body;
    const userId = 222;
  
    try {
      const response = await axios.get('http://103.231.86.182:5000/query/', {
        params: {
          user_id: userId,
          question: userMessage
        }
      });
  
      const answer = response?.data?.response || "❌ No response field in API.";
      await msg.reply(answer);
    } catch (err) {
      console.error("API Error:", err.message);
      await msg.reply("⚠️ I'm sorry, there was a temporary issue reaching our system. Please try again in a few moments. If the problem persists, feel free to call us at +91 4435057120 or +91 9384017122 for assistance.");

    }
  });
  

client.initialize();
