const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "davet",
  category: "Genel",
  usage: "davet",
  description: "Botu sunucunuza eklemenize yarayan link verir.",
  run: async (client, message, args) => {
    message.channel.send(
      "Unix'i sunucunuza eklemek için tıklayın: https://discord.com/api/oauth2/authorize?client_id=738013758345183323&permissions=8&scope=bot"
    );
  }
};

// red tick 738143412783677480
// green tick 738140062432100372
