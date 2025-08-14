const { zokou } = require("../framework/zokou");
const { default: axios } = require("axios");

zokou(
  {
    nomCom: "pair",
    aliases: ["session", "pair", "paircode", "qrcode"],
    reaction: "🎀",
    categorie: "General",
  },
  async (dest, origine, msg) => {
    const { repondre, arg } = msg;

    try {
      if (!arg || arg.length === 0) {
        return repondre("*Please provide a number in the format: 25474........*");
      }

      await repondre("*Please wait... Generating pair code*");

      const encodedNumber = encodeURIComponent(arg.join(" "));
      const apiUrl = `https://nexus-qr-code-1-caxd.onrender.com/code?number=${encodedNumber}`;
      
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data?.code) {
        await repondre(data.code);
        await repondre("*Copy the above code and use it to link your WhatsApp via linked devices*");
      } else {
        throw new Error("Invalid response from API - no code found");
      }
    } catch (error) {
      console.error("Error getting API response:", error.message);
      repondre("Error: Could not get response from the pairing service.");
    }
  }
);
