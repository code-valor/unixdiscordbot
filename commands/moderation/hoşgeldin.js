const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "hoşgeldinmesajı",
  category: "Moderasyon",
  usage: "hoşgeldinmesajı <kanal>",
  description: "Sunucunuzda resimli hoşgeldin mesajı ayarlamanızı sağlar.",
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
    db.set(`hosgeldinizkanali_${message.guild.id}`, kanal.id);
    let chl = await db.fetch(`hosgeldinizkanali_${message.guild.id}`);
    message.channel.send(
      `${client.emojis.cache.get(
        "738140062432100372"
      )} Hoşgeldiniz mesajı başarıyla ayarlandı. Artık sunucuya yeni bir kullanıcı katıldığında <#${chl}> kanalına resimli bir hoşgeldin mesajı atılacak.`
    );
  }
};

// red tick 738143412783677480
// green tick 738140062432100372
