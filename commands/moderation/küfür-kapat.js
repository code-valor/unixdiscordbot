const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "küfürkorumasıkapat",
  category: "Moderasyon",
  usage: "küfürkorumasıkapat",
  description: "Sunucunuzda küfür korumasını kapatır.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmalısın!`
      );

    db.set(`kufur_${message.guild.id}`, "kapali").then(data => {
      message.channel.send(
        `${client.emojis.cache.get(
          "738140062432100372"
        )} Küfür koruması başarıyla kapatıldı!`
      );
    });
  }
};

// red tick 738143412783677480
// green tick 738140062432100372
