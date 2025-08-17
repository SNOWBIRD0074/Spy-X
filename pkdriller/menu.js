const {
  zokou
} = require(__dirname + "/../framework/zokou");
const os = require('os');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
zokou({
  'nomCom': "menu",
  'categorie': "Menu"
}, async (_0x466846, _0x35dd19, _0x42e541) => {
  let {
    ms: _0x2f945c,
    repondre: _0x35a713,
    prefixe: _0x5b6b66,
    nomAuteurMessage: _0x4099cb,
    mybotpic: _0x11905
  } = _0x42e541;
  let {
    cm: _0x3f91bc
  } = require(__dirname + "/../framework/zokou");
  let _0x4b68cd = {};
  let _0x2fb207 = "public";
  if (s.MODE.toLowerCase() !== "yes") {
    _0x2fb207 = "private";
  }
  _0x3f91bc.map(_0x5a12df => {
    if (!_0x4b68cd[_0x5a12df.categorie]) {
      _0x4b68cd[_0x5a12df.categorie] = [];
    }
    _0x4b68cd[_0x5a12df.categorie].push(_0x5a12df.nomCom);
  });
  moment.tz.setDefault("Etc/GMT");
  const _0x30b447 = moment().format("DD/MM/YYYY");
  let _0x5810f6 = "\n━━☆𝑺𝒑𝒚-𝑿✧━━\n\n> ★  Oᴡɴᴇʀ : " + s.OWNER_NAME + "\n> ★ Pʀᴇғɪx : [ " + s.PREFIXE + " ]\n> ★ Mᴏᴅᴇ : " + _0x2fb207 + "\n> ★ Rᴀᴍ : 8/132 GB\n> ★  Dᴀᴛᴇ : " + _0x30b447 + "\n> ★ Pʟᴀᴛғᴏʀᴍ : " + os.platform() + "\n> ★ ᴄʀᴇᴀᴛᴏʀ : sɴᴏᴡʙɪʀᴅ\n> ★ Pʟᴜɢɢɪɴs : " + _0x3f91bc.length + "\n> ★ᴛʜᴇᴍᴇ : ☆𝑺𝒑𝒚-𝑿\n\n━━━☆𝑺𝒑𝒚-𝑿 𝑴𝑬𝑵𝑼━━━\n";
  let _0x499730 = "";
  for (const _0x297db1 in _0x4b68cd) {
    _0x499730 += "\n " + _0x297db1 + " \n ";
    for (const _0x38505c of _0x4b68cd[_0x297db1]) {
      _0x499730 += "          \n> ★ " + s.PREFIXE + "  " + _0x38505c + '';
    }
    _0x499730 += "\n\n";
  }
  _0x499730 += "\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɴᴏᴡʙɪʀᴅ\n";
  try {
    await _0x35dd19.sendMessage(_0x466846, {
      'text': _0x5810f6 + _0x499730,
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363399707841760@newsletter",
          'newsletterName': "☆𝑺𝒑𝒚-𝑿",
          'serverMessageId': 0x8f
        },
        'externalAdReply': {
          'title': "☆𝑺𝒑𝒚-𝑿",
          'body': "Tap to join the official channel",
          'thumbnailUrl': "https://files.catbox.moe/xqcr8w.jpg",
          'mediaType': 0x1,
          'renderLargerThumbnail': true
        }
      }
    });
    await _0x35dd19.sendMessage(_0x466846, {
      'audio': {
        'url': "https://files.catbox.moe/m4sf9a.mp3"
      },
      'mimetype': 'audio/mp4',
      'ptt': false
    });
  } catch (_0x2fdc61) {
    console.error("Menu error: ", _0x2fdc61);
    _0x35a713("Menu error: " + _0x2fdc61);
  }
});
