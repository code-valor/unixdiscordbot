const db = require("quick.db")
const { default_prefix } = require("../../config.json");
const Discord = require("discord.js");
const Gamedig = require('gamedig');

module.exports = {
  name: "minecraftsunucu",
  category: "Gaming",
  usage: "minecraftsunucu",
  description: "Mevcut Discord sunucusunda kayıtlı Minecraft sunucusundan veri çeker.",
  run: async (client, message, args) => {

    let ipAddress = await db.fetch(`minecraftsunucuip_${message.guild.id}`);

    if (!ipAddress) return message.channel.send('Bu sunucuda kayıtlı bir ARK sunucusu yok!');

    Gamedig.query({
        type: 'minecraft',
        host: `${ipAddress}`
    }).then((state) => {

        let players = state.players.map(player => player.name)

        let playerCount = state.players.length + ' / ' + state.maxplayers;

        if (ipAddress === 'mc.hypixel.net') {

              const hypixelUyariEmbed = new Discord.MessageEmbed().setDescription('UYARI: Eğer HYPIXEL sunucusundan veri çekmeye çalışıyorsanız -ki şuan öyle yapıyorsunuz- online oyuncu sayısı ve oyuncu listesi doğru verilemeyebilir. Zira bu problem HYPIXEL\'in diğer sunuculara göre AŞIRI derecede oyuncu almasından kaynaklıdır!');

              message.channel.send(hypixelUyariEmbed);

        }

       const sunucuVerisi = new Discord.MessageEmbed()
            .setColor('#3498db')
            .setTitle(state.name)
            .addFields(
            { name: 'Oyuncu Sayısı', value: playerCount },
            { name: 'Sunucu Gecikmesi', value: state.raw.vanilla.ping },
            { name: 'Bağlan', value: `steam://connect/${state.connect}` },
        );

        if (state.players.length > 20) {
            const maxOyuncuListesi = new Discord.MessageEmbed()
            .setTitle('Oyuncu Listesi')
            .setColor('#f1c40f')
            .setDescription('Sunucuda 20\'den fazla oyuncu bulunduğundan oyuncu listesi oluşturulamıyor!');

            setTimeout(function() {
                message.channel.send(maxOyuncuListesi);
              }, 300);

        } else {
            const oyuncuListesi = new Discord.MessageEmbed()
            .setTitle('Oyuncu Listesi')
            .setColor('#f1c40f')
            .setDescription(players.join('\n\n'));
    
            setTimeout(function() {
                message.channel.send(oyuncuListesi);
              }, 300);
        };


        message.channel.send(sunucuVerisi);
        console.log(state);
    }).catch((error) => {
        message.channel.send(`${client.emojis.cache.get("738143412783677480")} HATA: ${ipAddress} adresli sunucu çevrimdışı veya IP adresi yanlış girilmiş!`)
        console.log(error);
    });

}
};
  
  // red tick 738143412783677480
  // green tick 738140062432100372