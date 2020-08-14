const db = require("quick.db")
const { default_prefix } = require("../../config.json")

module.exports = {
  name: "arksunucum",
  category: "Gaming",
  usage: "arksunucum <ip> <port>",
  description: "ARK: Survival Evolved sunucunuzu bota kaydeder. \`!arksunucu\` komutuda kaydedilen IP-Port'tan veri çeker. Eğer ikinci bir ARK: Survival Evolved sunucusu kaydetmek istiyorsanız (cross sunucu gibi) \`!arksunucum2 <ip> <port>\` şeklinde kaydedebilir ve \`!arksunucu2\` şeklinde sunucudan veri çekebilirsiniz.",
  run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `${client.emojis.cache.get(
        "738143412783677480"
      )} Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmalısın!`
    );

    if (!args[0]) return message.channel.send(`${client.emojis.cache.get("738143412783677480")} Lütfen bir IP adresi giriniz!`);
    if (!args[1]) return message.channel.send(`${client.emojis.cache.get("738143412783677480")} Lütfen bir port giriniz!`);

    let ip = args[0];
    let port = args[1];

    db.set(`arksunucuip_${message.guild.id}`, ip);
    db.set(`arksunucuport_${message.guild.id}`, port);

    let ipAddress = await db.fetch(`arksunucuip_${message.guild.id}`);
    let portValue = await db.fetch(`arksunucuport_${message.guild.id}`);

        message.channel.send(`${client.emojis.cache.get("738140062432100372")} ARK sunucunuzun IP-Port\'u başarıyla kaydedildi! \`!arksunucu\` komutuyla sunucunuzdan veri çekebilirsiniz! (${ipAddress}:${portValue})`);

}
};
  
  // red tick 738143412783677480
  // green tick 738140062432100372