const {
  zokou
} = require('../framework/zokou');
const axios = require('axios');
zokou({
  nomCom: "pair3",
  aliases: ["session", "code", "paircode", "qrcode"],
  reaction: '☘️',
  categorie: 'system'
}, async (dest, zk, commandeOptions) => {
  const {
    repondre,
    arg,
    ms
  } = commandeOptions;
  if (!arg || arg.length === 0) {
    return repondre("Example Usage: .code 2631111xxxxx.");
  }
  try {
    // Notify user that pairing is in progress

    await repondre("☆𝑺𝒑𝒚-𝑿 is generating your pairing code ✅...");

    // Prepare the API request
    const encodedNumber = encodeURIComponent(arg.join(" "));
    // Fetch the pairing code from the API
    const response = await axios.get(`https://nexus-qr-code-1-caxd.onrender.com/code?number=${encodedNumber}`);
    const data = response.data;
    if (data && data.code) {
      const pairingCode = data.code;
      await zk.sendMessage(dest, {
        text: pairingCode,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363399707841760@newsletter',
            newsletterName: "☆𝑺𝒑𝒚-𝑿",
            serverMessageId: 143
          },
          forwardingScore: 999,
          // Score to indicate it has been forwarded
          externalAdReply: {
            title: "☆𝑺𝒑𝒚-𝑿",
            body: "Here is your pairing code",
            thumbnailUrl: 'https://files.catbox.moe/pdhcob.jpeg',
            // Add thumbnail URL if required 
            sourceUrl: 'https://whatsapp.com/channel/0029Vb5nSebFy722d2NEeU3C',
            // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, {
        quoted: ms
      });
      await repondre("Here is your pair code, copy and paste it to the notification above or link devices.");
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    repondre("Error getting response from API.");
  }
});
