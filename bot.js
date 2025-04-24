const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

// Use session persistence
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// Generate QR for authentication
client.on('qr', qr => {
    console.log('📱 Scan this QR with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Bot is ready
client.on('ready', () => {
    console.log('✅ WhatsApp bot is ready!');
});

// Handle incoming messages
client.on('message', async msg => {
    const userMessage = msg.body;
    const userId = 222;

    try {
        const { data } = await axios.get('http://103.231.86.182:5000/query/', {
            params: {
                user_id: userId,
                question: userMessage
            },
            timeout: 8000  // Optional: timeout for API call
        });

        const answer = data?.response || "❌ No response received from API.";
        await msg.reply(answer);
    } catch (error) {
        console.error("API Error:", error.toString());

        await msg.reply(
            "⚠️ Sorry, we're facing a technical issue. Try again shortly.\n" +
            "If this continues, contact us:\n📞 +91 4435057120\n📞 +91 9384017122"
        );
    }
});

// Initialize client
client.initialize();
