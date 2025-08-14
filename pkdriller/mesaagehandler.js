const conf = require("./set"); // or wherever your config is
const axios = require("axios");

async function chatbotAutoReply(m, zk) {
  const botJid = zk.user.id;
  const from = m.key.remoteJid;
  const sender = m.key.participant || from;
  const isGroup = from.endsWith("@g.us");
  const text = m.message?.conversation || m.message?.extendedTextMessage?.text;

  if (!text || m.key.fromMe || !conf.CHATBOT) return;

  // Group filters: reply only when mentioned or replied
  if (isGroup) {
    const mentionCheck = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.includes(botJid);
    const quotedCheck = m.message?.extendedTextMessage?.contextInfo?.participant === botJid;
    const replyCheck = m.message?.extendedTextMessage?.contextInfo?.stanzaId &&
                       m.message?.extendedTextMessage?.contextInfo?.participant === botJid;

    if (!mentionCheck && !quotedCheck && !replyCheck) return;
  }

  // Track conversation history
  global.userChats ??= {};
  global.userChats[sender] ??= [];

  global.userChats[sender].push(`User: ${text}`);
  if (global.userChats[sender].length > 15) global.userChats[sender].shift();

  const prompt = `
You are popkid-gle, a friendly WhatsApp bot.

### Conversation History:
${global.userChats[sender].join("\n")}
  `;

  try {
    const { data } = await axios.get("https://mannoffc-x.hf.space/ai/logic", {
      params: { q: text, logic: prompt }
    });

    const reply = data.result;
    global.userChats[sender].push(`Bot: ${reply}`);

    await zk.sendMessage(from, { text: reply }, { quoted: m });
  } catch (e) {
    console.error("Chatbot Error:", e);
    await zk.sendMessage(from, { text: "❌ Failed to get response." }, { quoted: m });
  }
}

module.exports.chatbotAutoReply = chatbotAutoReply;
