'use strict';

Object.defineProperty(exports, "__esModule", {
  'value': true
});
const {
  zokou
} = require("../framework/zokou");
const newsletterContext = {
  'contextInfo': {
    'forwardingScore': 0x3e7,
    'isForwarded': true,
    'forwardedNewsletterMessageInfo': {
      'newsletterJid': "120363288304618280@newsletter",
      'newsletterName': "𝐍𝐄𝐗𝐔𝐒-𝐀𝐈",
      'serverMessageId': 0x1
    }
  }
};
zokou({
  'nomCom': "repo",
  'catégorie': "Général",
  'reaction': '🟢',
  'nomFichier': __filename
}, async (_0x3ebb47, _0xff3268, _0x48dbdb) => {
  try {
    const _0x1583f8 = await fetch("https://api.github.com/repos/Pkdriller01/NEXUS-AI");
    const _0x498987 = await _0x1583f8.json();
    if (_0x498987) {
      const _0x491941 = {
        'stars': _0x498987.stargazers_count,
        'forks': _0x498987.forks_count,
        'lastUpdate': _0x498987.updated_at,
        'owner': _0x498987.owner.login
      };
      const _0x1ffe6b = new Date(_0x498987.created_at).toLocaleDateString("en-GB");
      const _0x4ee1b4 = "*𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*\n\n_________● *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈* ●____________\n|💥 *ʀᴇᴘᴏsɪᴛᴏʀʏ:* " + _0x498987.html_url + "\n|🌟 *sᴛᴀʀs:* " + _0x491941.stars + "\n|🍽 *ғᴏʀᴋs:* " + _0x491941.forks + "\n|⌚️ *ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ:* " + _0x1ffe6b + "\n|🕐 *ᴜᴘᴅᴀᴛᴇ ᴏɴ:* " + _0x491941.lastUpdate + "\n|👨‍💻 *ᴏᴡɴᴇʀ:* *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*\n|💞 *ᴛʜᴇᴍᴇ:* *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*\n|🥰*ᴏɴʟʏ ɢᴏᴅ ᴄᴀɴ ᴊᴜᴅɢᴇ ᴍᴇ!👑*\n__________________________________\n            *ᴍᴀᴅᴇ ᴡɪᴛʜ 𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*";
      await _0xff3268.sendMessage(_0x3ebb47, {
        'image': {
          'url': "https://files.catbox.moe/fwkkud.jpg"
        },
        'caption': _0x4ee1b4,
        ...newsletterContext
      });
      await _0xff3268.sendMessage(_0x3ebb47, {
        'audio': {
          'url': "https://files.catbox.moe/uhfull.mp3"
        },
        'mimetype': "audio/mp4",
        'ptt': false,
        ...newsletterContext
      });
    } else {
      console.log("Could not fetch data");
    }
  } catch (_0x475131) {
    console.log("Error fetching data:", _0x475131);
  }
});
