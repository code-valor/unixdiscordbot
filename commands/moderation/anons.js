const db = require("quick.db");
const Discord = require("discord.js");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "anons",
  category: "Moderasyon",
  usage: "anons <duyuru-mesajınız>",
  description: "Sunucunuzda güzel bir şablon ile duyuru yapmanızı sağlar.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmalısın!`
      );

    let duyuruMesajı = args.slice(0).join(" ");

    let customPrefix = db.get(`prefix_${message.guild.id}`);

    if (!args[0])
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Lütfen bir duyuru mesajı gir. Kullanım: ${customPrefix ||
          default_prefix}anons <duyuru-mesajınız>`
      );

    const duyuruEmbed = new Discord.MessageEmbed()
      .setColor("#2ecc71")
      .setTitle(`${message.guild.name} | Duyuru`)
      .setThumbnail(
        `${message.guild.iconURL() ||
          "https://cdn.discordapp.com/avatars/738013758345183323/36404e6c7e14dc8a74381f15a6fd6958.webp"}`
      )
      .setFooter(
        `${message.author.username}#${message.author.discriminator} tarafından anons edildi`
      )
      .setTimestamp()
      .setDescription(duyuruMesajı);
    message.channel.send(duyuruEmbed);
  }
};

// red tick 738143412783677480
// green tick 738140062432100372
