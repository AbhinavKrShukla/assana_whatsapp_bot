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
    const userId = 10;
  
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
      await msg.reply("⚠️ Could not get a response from the server.");
    }
  });
  

client.initialize();
