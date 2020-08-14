const db = require("quick.db")
const { default_prefix } = require("../../config.json")

module.exports = {
  name: "minecraftsunucum",
  category: "Gaming",
  usage: "minecraftsunucum <ip>",
  description: "Minecraft sunucunuzu bota kaydeder. \`!minecraftsunucu\` komutuda kaydedilen IP'den veri çeker.",
  run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `${client.emojis.cache.get(
        "738143412783677480"
      )} Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmalısın!`
    );

    if (!args[0]) return message.channel.send(`${client.emojis.cache.get("738143412783677480")} Lütfen bir IP adresi giriniz!`);

    let ip = args[0];

    db.set(`minecraftsunucuip_${message.guild.id}`, ip);

    let ipAddress = await db.fetch(`minecraftsunucuip_${message.guild.id}`);

        message.channel.send(`${client.emojis.cache.get("738140062432100372")} Minecraft sunucunuzun IP\'si başarıyla kaydedildi! \`!minecraftsunucu\` komutuyla sunucunuzdan veri çekebilirsiniz! (${ipAddress})`);

}
};
  
  // red tick 738143412783677480
  // green tick 738140062432100372