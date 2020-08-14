const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "prefix",
  category: "Moderasyon",
  usage: "prefix <yeni-prefix>",
  description: "Sunucu prefixini değiştirir.",
  run: async (client, message, args) => {
    //PERMISSION
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Prefix'i değiştirmeniz için \`YÖNETİCİ\` yetkiniz olması lazım!"
      );
    }

    if (!args[0]) {
      return message.channel.send("Lütfen bir prefix giriniz");
    }

    if (args[1]) {
      return message.channel.send("İkinci bir prefix yapamazsın!");
    }

    if (args[0].length > 3) {
      return message.channel.send("3 karakterden uzun bir prefix yapamazsın!");
    }

    if (args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`);
      return await message.channel.send("Prefix sıfırlandı! ✅");
    }

    db.set(`prefix_${message.guild.id}`, args[0]);
    await message.channel.send(
      `Bot prefixi değiştirildi. Yeni prefix: \`${args[0]}\``
    );
  }
};
