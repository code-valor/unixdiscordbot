const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "temizle",
  category: "Moderasyon",
  usage: "temizle <mesaj-sayısı>",
  description: "Belirtilen miktarda mesaj siler.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmalısın!`
      );

    if (!args[0])
      return message.channel.send("Sileceğim mesaj sayısını belirt!");
    if (args[0] > 100)
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} \`100\` miktardan fazla mesajı tek seferde silemezsin. Lütfen \`100\`'den düşük bir miktar belirt.`
      );

    message.channel.bulkDelete(args[0]).then(() => {
      message.channel
        .send(
          ` ${client.emojis.cache.get("738140062432100372")} \`${
            args[0]
          }\` adet mesaj başarıyla imha edildi! `
        )
        .then(msg => msg.delete({ timeout: 5000 }))
        .catch(error => {
          console.log(error);
        });
    });
  }
};
