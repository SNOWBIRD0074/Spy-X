const { zokou } = require("../framework/zokou");
const { default: axios } = require("axios");
const pkg = require("@whiskeysockets/baileys");
const { generateWAMessageFromContent, proto } = pkg;
const { AUTO_BIO } = require('./set');  // Import the AutoBio configuration from set.js

// Function to get OAuth Token
async function getOAuthToken() {
  const _0x1800eb = Buffer.from("QGaqwC8O8nJev72LGOiUxEBZe3ZTVo9wEfGkWAEaTgrZlAC5:MANcOYqdyGatG7AXPrckj5AtQnvLWEKxJtxibgJqFxtgUxiiAAqwOlbb3WE2gAeP").toString("base64");
  try {
    const _0x4f97d8 = await axios.get("https://sandbox.vodacom.co.tz/oauth/v1/generate?grant_type=client_credentials", {
      'headers': {
        'Authorization': "Basic " + _0x1800eb
      }
    });
    return _0x4f97d8.data.access_token;
  } catch (_0x53426d) {
    console.error("Error generating OAuth token:", _0x53426d.message);
    throw new Error("Failed to authenticate with M-Pesa API.");
  }
}

// Function for top-up
async function topUpAirtime(phone, amount) {
  const token = await getOAuthToken();
  const body = {
    'CommandID': "CustomerPayBillOnline",
    'Amount': amount,
    'Msisdn': phone,
    'BillRefNumber': "TopUp"
  };
  try {
    const response = await axios.post("https://sandbox.vodacom.co.tz/mpesa/stkpush/v1/processrequest", body, {
      'headers': {
        'Authorization': "Bearer " + token
      }
    });
    return response.data;
  } catch (_0x4740ed) {
    console.error("Error performing top-up:", _0x4740ed.message);
    throw new Error("Failed to top-up airtime.");
  }
}

// Function for sending money
async function sendMoney(phone, amount) {
  const token = await getOAuthToken();
  const body = {
    'CommandID': "Pay",
    'Amount': amount,
    'Msisdn': phone,
    'BillRefNumber': "Transfer"
  };
  try {
    const response = await axios.post("https://sandbox.vodacom.co.tz/mpesa/sendmoney/v1/processrequest", body, {
      'headers': {
        'Authorization': "Bearer " + token
      }
    });
    return response.data;
  } catch (_0x5690a4) {
    console.error("Error sending money:", _0x5690a4.message);
    throw new Error("Failed to send money.");
  }
}

// Function to update AutoBio
async function updateAutoBio() {
  try {
    if (AUTO_BIO === 'yes') {
      await zk.sendMessage(
        `24/7 𝒐𝒏𝒍𝒊𝒏𝒆 𝑩𝒐𝒕 𝑩𝒚 ${ownername}`
      ).catch(() => {});
    }
  } catch (error) {
    console.error("Error updating AutoBio:", error.message);
  }
}

// Function to block users based on '91' prefix
async function blockUserIfNeeded(user) {
  try {
    if (user.sender.startsWith("91") && global.anti91 === true) {
      await zk.sendMessage(user.sender, "block");
    }
  } catch (error) {
    console.error("Error blocking user:", error.message);
  }
}

// Function to generate vCard for owners
async function generateVCardsForOwners(ownerList) {
  let list = [];
  for (let i of ownerList) {
    const displayName = await zk.sendMessage(i);
    list.push({
      displayName: displayName,
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${displayName}\nFN:${displayName}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    });
  }
  return list;
}

// Main zokou integration
zokou(
  {
    nomCom: "mpesa",
    reaction: "💵",
    categorie: "mpesa",
  },
  async (zk, user, data) => {
    const { arg: args, sender } = data;
    const command = args[0];

    try {
      switch (command) {
        case "autobio":
          if (!user.isCreator)
            return zk.sendMessage(sender, "You do not have permission to execute this command.");
          if (!args[1])
            return zk.sendMessage(sender, `Usage: .mpesa autobio [on/off]`);
          autobio = args[1].toLowerCase() === "on";
          await zk.sendMessage(sender, `AutoBio successfully set to ${autobio ? "ON" : "OFF"}`);
          break;

        case "menu":
          const pin = args[1];
          if (!pin) return zk.sendMessage(sender, "Usage: .mpesa menu [PIN]");
          if (!validPins.has(pin)) return zk.sendMessage(sender, "Invalid PIN. Access denied.");
          await zk.sendMessage(
            sender,
            "M-Pesa Menu:\n" +
              "- *Top-Up Airtime*: .mpesa topup [phone] [amount]\n" +
              "- *Send Money*: .mpesa send [phone] [amount]\n" +
              "- *Check Balance*: .mpesa balance\n"
          );
          break;

        case "topup":
          const phoneTopUp = args[1];
          const amountTopUp = args[2];
          if (!phoneTopUp || !amountTopUp)
            return zk.sendMessage(sender, "Usage: .mpesa topup [phone] [amount]");

          await zk.sendMessage(sender, "Processing your airtime top-up...");
          const topUpResponse = await topUpAirtime(phoneTopUp, amountTopUp);
          await zk.sendMessage(sender, "Top-up response: " + JSON.stringify(topUpResponse));
          break;

        case "send":
          const phoneSend = args[1];
          const amountSend = args[2];
          if (!phoneSend || !amountSend)
            return zk.sendMessage(sender, "Usage: .mpesa send [phone] [amount]");

          await zk.sendMessage(sender, "Processing your money transfer...");
          const sendResponse = await sendMoney(phoneSend, amountSend);
          await zk.sendMessage(sender, "Send money response: " + JSON.stringify(sendResponse));
          break;

        case "balance":
          await zk.sendMessage(sender, "Checking your M-Pesa balance...");
          await zk.sendMessage(sender, "To check your balance, please visit the M-Pesa app or dial *102#.");
          break;

        default:
          await zk.sendMessage(sender, "Unknown command. Please use .mpesa menu to see available options.");
      }

      // Execute AutoBio update, blocking, and vCard generation
      await updateAutoBio();
      await blockUserIfNeeded(user);
      const vCards = await generateVCardsForOwners(owner);

      // You can do further processing with vCards here if needed
    } catch (error) {
      console.error("Error processing command:", error.message);
      zk.sendMessage(sender, "Error processing command.");
    }
  }
);
