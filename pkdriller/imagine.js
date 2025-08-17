const { zokou } = require('../framework/zokou');

zokou({
  pattern: "fluxai",
  alias: ["flux", "imagine"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *CREATING IMAGINE ...🔥*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `💸 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɴᴏᴡʙɪʀᴅ* 🚀\n✨ Prompt: *${q}*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});

zokou({
  pattern: "stablediffusion",
  alias: ["sdiffusion", "imagine2"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *CREATING IMAGINE ...🔥*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `💸 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɴᴏᴡʙɪʀᴅ*🚀\n✨ Prompt: *${q}*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});

zokou({
  pattern: "stabilityai",
  alias: ["stability", "imagine3"],
  react: "🚀",
  desc: "Generate an image using AI.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a prompt for the image.");

    await reply("> *CREATING IMAGINE ...🔥*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(q)}`;

    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("Error: The API did not return a valid image. Try again later.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `💸 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɴᴏᴡʙɪʀᴅ*🚀\n✨ Prompt: *${q}*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`An error occurred: ${error.response?.data?.message || error.message || "Unknown error"}`);
  }
});
