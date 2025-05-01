module.exports = {
	config: {
  name: "goiadmin",
  author: "𝗔𝗺𝗶𝗻𝘂𝗹 𝗦𝗼𝗿𝗱𝗮𝗿",
  role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "BOT",
  guide: "{pn}"
	},

onChat: function({ api, event }) {
	if (event.senderID !== "61552930114349") {
  var aid = ["61552930114349"];
  for (const id of aid) {
  if ( Object.keys(event.mentions) == id) {
   var msg = ["𝐓𝐎𝐌 বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!🐰🍒","এতো মিনশন নাহ দিয়া সিংগেল 𝐓𝐎𝐌 রে একটা গফ দে 🧛‍♀️","Mantion_না দিয়ে সিরিয়াস প্রেম করতে চাইলে ইনবক্স","মেনশন দিসনা পারলে একটা গফ দে","Mantion_দিস না বাঁলপাঁক্না 𝐓𝐎𝐌 প্রচুর বিজি 🥵🥀🤐"];
   return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
  }
  }}
},
onStart: async function({}) {
	}
};
