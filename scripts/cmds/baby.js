const axios = require("axios");

const prefixes = ["bby", "janu", "bot", "xan", "sona", "bbu", "jaan"];

module.exports = {
  config: {
    name: "bot",
    version: "1.6.9",
    author: "Jani na ke riyel author (maybe dipto bhai)",
    role: 0,
    description: {
      en: "No prefix command.",
    },
    category: "ai",
    guide: {
      en: "Just type a prefix like 'bby' followed by your message.",
    },
  },

  onStart: async function () {
    console.log("Bot command initialized.");
  },

  // Helper function to remove a prefix
  removePrefix: function (str, prefixes) {
    for (const prefix of prefixes) {
      if (str.startsWith(prefix)) {
        return str.slice(prefix.length).trim();
      }
    }
    return str;
  },

  onReply: async function ({ api, event }) {
    if (event.type === "message_reply") {
      try {
        let reply = event.body.toLowerCase();
        reply = this.removePrefix(reply, prefixes) || "bby";

        // Updated URL instead of global.GoatBot.config.api
        const response = await axios.get(
          `https://www.noobs-api.rf.gd/dipto/baby?text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`
        );

        const message = response.data.reply;
        if (response.data.react) {
          setTimeout(() => {
            api.setMessageReaction(response.data.react, event.messageID, () => {}, true);
          }, 400);
        }

        api.sendMessage(message, event.threadID, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: "bot",
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            text: message,
          });
        }, event.messageID);
      } catch (err) {
        console.error(err.message);
        api.sendMessage(" An error occurred.", event.threadID, event.messageID);
      }
    }
  },

  onChat: async function ({ api, event }) {
    const randomReplies = ["𝐁𝐨𝐥𝐨 𝐣𝐚𝐧 𝐤𝐢 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐢 𝐭𝐦𝐫 𝐣𝐨𝐧𝐧𝐨🥹", "𝐆𝐚𝐣𝐚 𝐤𝐡𝐚 𝐦𝐚𝐧𝐮𝐬𝐡 𝐡𝐨 🍁🤡", "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🐸", "দূরে যা, তোর কোনো কাজ নাই, শুধু 𝗯𝗯𝘆 𝗯𝗯𝘆 করিস 🐸", "𝐀𝐦𝐚𝐤𝐞 𝐞𝐭𝐨 𝐧𝐚 𝐝𝐞𝐤𝐞 𝐚𝐦𝐫 𝐛𝐨𝐬𝐬 𝐓𝐨𝐦 𝐤𝐞 𝐞𝐤𝐭𝐚 𝐠𝐨𝐟 𝐝𝐞 😾", "𝐄𝐭𝐨 𝐛𝐚𝐛𝐲 𝐛𝐚𝐛𝐲 𝐤𝐨𝐫𝐨𝐬𝐡 𝐤𝐢𝐥𝐥𝐚𝐢 😒", "𝗔𝗺𝗿 𝗯𝗼𝘀𝘀 𝗷𝗲 𝘀𝗶𝗻𝗴𝗹𝗲 𝗰𝗵𝗼𝗸𝗲 𝗽𝗼𝗿𝗲 𝗻𝗮 𝘁𝗼𝗿 😒", "𝕂𝕚 𝕜𝕠𝕓𝕚 𝕜𝕠 𝕥𝕠𝕣 𝕛𝕠𝕟𝕟𝕠𝕚 𝕓𝕠𝕤𝕖 𝕒𝕔𝕙𝕚 😒", "𝐇𝐚𝐫𝐚𝐦𝐣𝐚𝐝𝐢 𝐛𝐨𝐥 𝐤𝐢 𝐛𝐨𝐥𝐛𝐢 🙈", "𝐀𝐦𝐫 𝐛𝐨𝐬𝐬 𝐞𝐫 𝐢𝐝 𝐛𝐨𝐬𝐬 𝐤𝐢𝐧𝐭𝐮 𝐬𝐢𝐧𝐠𝐥𝐞 https://m.me/pixxi.143", "বার বার ডাকলে মাথা গরম হয় কিন্তু 😒", "𝐁𝐨𝐥𝐨 𝐛𝐞𝐟𝐲 𝐤𝐢 𝐛𝐨𝐥𝐛𝐚 😭", "𝙑𝙝𝙪𝙡𝙚 𝙟𝙖𝙬 𝙖𝙢𝙖𝙠𝙚 😞", "𝗔𝗺𝗿 𝗯𝗼𝘀𝘀 𝗧𝗼𝗺 𝗲𝗿 𝗺𝗼𝗻 𝗸𝗵𝗮𝗿𝗮𝗽 𝗯𝗼𝘀𝘀 𝗲𝗿 𝗴𝗼𝗳 𝗻𝗮𝗶 😿"];
    const rand = randomReplies[Math.floor(Math.random() * randomReplies.length)];

    const messageBody = event.body ? event.body.toLowerCase() : "";
    const words = messageBody.split(" ");
    const wordCount = words.length;

    if (event.type !== "message_reply") {
      let messageToSend = messageBody;
      messageToSend = this.removePrefix(messageToSend, prefixes);

      if (prefixes.some((prefix) => messageBody.startsWith(prefix))) {
        setTimeout(() => {
          api.setMessageReaction("🐰", event.messageID, () => {}, true);
        }, 400);

        api.sendTypingIndicator(event.threadID, true);

        if (event.senderID === api.getCurrentUserID()) return;

        const msg = { body: rand };

        if (wordCount === 1) {
          setTimeout(() => {
            api.sendMessage(msg, event.threadID, (err, info) => {
              global.GoatBot.onReply.set(info.messageID, {
                commandName: "bot",
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                link: msg,
              });
            }, event.messageID);
          }, 400);
        } else {
          words.shift(); // Removing the prefix
          const remainingText = words.join(" ");

          try {
            // Updated URL instead of global.GoatBot.config.api
            const response = await axios.get(
              `https://www.noobs-api.rf.gd/dipto/baby?text=${encodeURIComponent(remainingText)}&senderID=${event.senderID}&font=1`
            );
            const message = response.data.reply;

            if (response.data.react) {
              setTimeout(() => {
                api.setMessageReaction(
                  response.data.react,
                  event.messageID,
                  () => {},
                  true
                );
              }, 500);
            }

            api.sendMessage({ body: message }, event.threadID, (error, info) => {
              global.GoatBot.onReply.set(info.messageID, {
                commandName: this.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                link: message,
              });
            }, event.messageID);
          } catch (err) {
            console.error(err.message);
            api.sendMessage(" An error occurred.", event.threadID, event.messageID);
          }
        }
      }
    }

    // Handling reaction triggers based on certain text patterns
    const reactions = ["haha", "👽", "lol", "pro", "gpt", "🧘‍♂️", "hehe"];
    if (reactions.some(reaction => messageBody.includes(reaction))) {
      setTimeout(() => {
        api.setMessageReaction("👾", event.messageID, () => {}, true);
      }, 500);
    }
  }
};
