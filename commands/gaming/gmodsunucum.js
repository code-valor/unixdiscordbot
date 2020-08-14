const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "gmodsunucum",
  category: "Gaming",
  usage: "gmodsunucum <ip> <port>",
  description:
    "Garry's Mod sunucunuzu bota kaydeder. `!gmodsunucu` komutuda kaydedilen IP-Port'tan veri çeker.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmalısın!`
      );

    if (!args[0])
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Lütfen bir IP adresi giriniz!`
      );
    if (!args[1])
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Lütfen bir port giriniz!`
      );

    let ip = args[0];
    let port = args[1];

    db.set(`gmodsunucuip_${message.guild.id}`, ip);
    db.set(`gmodsunucuport_${message.guild.id}`, port);

    let ipAddress = await db.fetch(`gmodsunucuip_${message.guild.id}`);
    let portValue = await db.fetch(`gmodsunucuport_${message.guild.id}`);

    message.channel.send(
      `${client.emojis.cache.get(
        "738140062432100372"
      )} GMOD sunucunuzun IP-Port\'u başarıyla kaydedildi! \`!gmodsunucu\` komutuyla sunucunuzdan veri çekebilirsiniz! (${ipAddress}:${portValue})`
    );
  }
};

// red tick 738143412783677480
// green tick 738140062432100372
