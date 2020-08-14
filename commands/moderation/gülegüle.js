const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "çıkışmesajı",
  category: "Moderasyon",
  usage: "çıkışmesajı <kanal>",
  description: "Sunucunuzda resimli bir güle güle mesajı ayarlamanızı sağlar.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmalısın!`
      );

    let kanal = message.mentions.channels.first();
    if (!args[0])
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Bir kanal belirtmediniz!`
      );
    db.set(`gulegulekanali_${message.guild.id}`, kanal.id);
    let chl = await db.fetch(`gulegulekanali_${message.guild.id}`);
    message.channel.send(
      `${client.emojis.cache.get(
        "738140062432100372"
      )} Güle güle mesajı başarıyla ayarlandı. Artık sunucudan biri çıkış yaptığında <#${chl}> kanalına resimli bir güle güle mesajı atılacak.`
    );
  }
};

// red tick 738143412783677480
// green tick 738140062432100372
