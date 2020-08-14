const db = require("quick.db")
const { default_prefix } = require("../../config.json");
const Discord = require("discord.js");
const Gamedig = require('gamedig');

module.exports = {
  name: "arksunucu2",
  category: "Gaming",
  usage: "arksunucu2",
  description: "Mevcut Discord sunucusunda kayıtlı ikinci (cross) ARK: Survival Evolved sunucusundan veri çeker.",
  run: async (client, message, args) => {

    let ipAddress = await db.fetch(`arksunucuip2_${message.guild.id}`);
    let portValue = await db.fetch(`arksunucuport2_${message.guild.id}`);

    if (!ipAddress) return message.channel.send('Bu sunucuda kayıtlı ikinci bir ARK sunucusu yok!');

    Gamedig.query({
        type: 'arkse',
        port: `${portValue}`,
        host: `${ipAddress}`
    }).then((state) => {

        let players = state.players.map(player => player.name)

        let playerCount = state.players.length + ' / ' + state.maxplayers;

        const sunucuVerisi = new Discord.MessageEmbed()
        .setColor('#2ecc71')
        .setTitle(state.name)
        .addFields(
            { name: 'Harita', value: state.map },
            { name: 'Oyuncu Sayısı', value: playerCount },
            { name: 'Sunucu Gecikmesi', value: state.ping },
            { name: 'Bağlan', value: `steam://connect/${ipAddress}:${portValue}` },
        );

        const oyuncuListesi = new Discord.MessageEmbed()
        .setTitle('2. Sunucu için Oyuncu Listesi')
        .setColor('#f1c40f')
        .setDescription(players.join('\n\n'));

        setTimeout(function() {
            message.channel.send(oyuncuListesi);
          }, 300);
        message.channel.send(sunucuVerisi);
        console.log(state)
    }).catch((error) => {
        message.channel.send(`${client.emojis.cache.get("738143412783677480")} HATA: ${ipAddress}:${portValue} adresli sunucu çevrimdışı veya IP/Port adresi yanlış girilmiş!`)
    });

}
};
  
  // red tick 738143412783677480
  // green tick 738140062432100372