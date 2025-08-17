




const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

const AUDIO_URL = "https://files.catbox.moe/mfhv0a.mp3"; // New audio URL
const THUMBNAIL_URL = "https://files.catbox.moe/xqcr8w.jpg"; // New image URL

moment.tz.setDefault(`${conf.TZ}`);

const getTimeAndDate = () => {
    return {
        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')
    };
};

// Ping Command
zokou({ nomCom: "ping", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 1000) + 1; // Generate a random ping between 1ms - 100ms

    try {
    await zk.sendMessage(dest, {
        audio: { url: AUDIO_URL }, 
            mimetype: 'audio/mp4', 
            ptt: true, // Voice note form
      text: `Pong...: ${ping}ms\n🎧💻`,
      contextInfo: {
        forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363399707841760@newsletter',
              newsletterName: '☆𝑺𝒑𝒚-𝑿',
              serverMessageId: 143},
        externalAdReply: {
          
          title: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɴᴏᴡʙɪʀᴅ ",
      body: "Enjoy...",
      thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          
        }
      }
    }, { quoted: ms });

    await zk.sendMessage(dest, {
        text: "```my repo is here https://github.com/SNOWBIRD0074/Spy-X```"
    } ,{ quoted: ms });// Voice note form
    }catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});
