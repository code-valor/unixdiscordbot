const db = require("quick.db");
const { default_prefix } = require("../../config.json");
const Discord = require("discord.js");
const Gamedig = require("gamedig");

module.exports = {
  name: "gmodsunucu",
  category: "Gaming",
  usage: "gmodsunucu",
  description:
    "Mevcut Discord sunucusunda kayıtlı Garry's Mod sunucusundan veri çeker.",
  run: async (client, message, args) => {
    let ipAddress = await db.fetch(`gmodsunucuip_${message.guild.id}`);
    let portValue = await db.fetch(`gmodsunucuport_${message.guild.id}`);

    if (!ipAddress)
      return message.channel.send(
        "Bu sunucuda kayıtlı bir GMOD sunucusu yok!"
      );

    Gamedig.query({
      type: "garrysmod",
      port: `${portValue}`,
      host: `${ipAddress}`
    })
      .then(state => {
        let players = state.players.map(player => player.name);

        let playerCount = state.players.length + " / " + state.maxplayers;

        const sunucuVerisi = new Discord.MessageEmbed()
          .setColor("#3498db")
          .setTitle(state.name)
          .addFields(
            { name: "Harita", value: state.map },
            { name: "Oyuncu Sayısı", value: playerCount },
            { name: "Sunucu Gecikmesi", value: state.ping },
            { name: "Bağlan", value: `steam://connect/${state.connect}` }
          );

        const oyuncuListesi = new Discord.MessageEmbed()
          .setTitle("Oyuncu Listesi")
          .setColor("#f1c40f")
          .setDescription(players.join("\n\n"));

        setTimeout(function() {
          message.channel.send(oyuncuListesi);
        }, 300);
        message.channel.send(sunucuVerisi);
        console.log(state);
      })
      .catch(error => {
        console.log(error);
        message.channel.send(
          `${client.emojis.cache.get(
            "738143412783677480"
          )} HATA: ${ipAddress}:${portValue} adresli sunucu çevrimdışı veya IP/Port adresi yanlış girilmiş!`
        );
      });
  }
};

// red tick 738143412783677480
// green tick 738140062432100372
