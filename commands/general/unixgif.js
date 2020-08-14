const db = require("quick.db")
const { default_prefix } = require("../../config.json")

module.exports = {
  name: "unixgif",
  category: "Genel",
  usage: "unixgif",
  description: "Unix'in tanıtım GIF'ini gönderir.",
  run: async (client, message, args) => {
    message.channel.send('https://media1.tenor.com/images/0c93c8c9aa84bc22ec5297a52421a8c3/tenor.gif?itemid=17961241');
}
};
  
  // red tick 738143412783677480
  // green tick 738140062432100372