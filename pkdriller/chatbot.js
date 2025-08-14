// commands/chatbot.js
const { getGptReply } = require('../framework/ai');
const { isPublic } = require('../bdd/settings.json'); // example check

module.exports = {
  name: 'chatbot',
  description: 'Smart AI chatbot',
  category: 'AI',
  commandType: 'auto',
  async execute(m, conn) {
    try {
      if (!m.text || m.fromMe || m.isGroup) return;

      // Ignore command-like messages
      if (m.text.startsWith('.')) return;

      const response = await getGptReply(m.text);
      if (!response) return;

      await conn.sendMessage(m.chat, {
        text: `🤖 *ChatBot*\n\n${response}\n\n_Powered by ArslanMD Official_`
      }, { quoted: m });

    } catch (err) {
      console.log('Chatbot Error:', err);
    }
  }
};
