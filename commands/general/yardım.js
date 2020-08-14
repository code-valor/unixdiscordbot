const db = require("quick.db");
const Discord = require("discord.js");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "yardım",
  category: "Genel",
  usage: "yardım",
  description: "Bot ve komutları hakkında bilgi verir.",
  run: async (client, message, args) => {
    
      if (!args[0]) {

        const helpEmbed = new Discord.MessageEmbed()
        .setColor("#3498db")
        .setTitle("Unix BOT | Yardım")
        .setDescription(
          `${client.commands
            .map(
              cmd =>
                `**${default_prefix}${cmd.name}** | **Kategori:** ${cmd.category}`
            )
            .join("\n\n")}\n\n**Bilgi:** Bir komut hakkında detaylı bilgi için \`${default_prefix}yardım <komut-ismi>\`\n\n**Mevcut Sunucu Prefix'i:** ${db.get(`prefix_${message.guild.id}`) || default_prefix}`
        );
      setTimeout(function() {
        message.channel.send(helpEmbed);
      }, 300);
  
      };
  
      if (args[0]) {
        let komut = args[0];
        if (client.commands.has(komut)) {
          komut = client.commands.get(komut);
          const komutBilgi = new Discord.MessageEmbed().setDescription(`${default_prefix}${komut.name} \n**Açıklama:** ${komut.description} \n**Kullanım:** ${default_prefix}${komut.usage} \n**Kategori:** ${komut.category}`);
          message.channel.send(komutBilgi);
        }
      }


  }
};

// red tick 738143412783677480
// green tick 738140062432100372
