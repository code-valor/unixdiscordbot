const db = require("quick.db");
const Discord = require("discord.js");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "sustur",
  category: "Moderasyon",
  usage: "sustur <kullanıcı>",
  description: "Etiketlediğiniz kullanıcıyı susturur.",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${client.emojis.cache.get(
          "738143412783677480"
        )} Bu komutu kullanmak için \`YÖNETİCİ\` yetkisine sahip olmalısın!`
      );

          const muteRole = message.guild.roles.cache.find(role => role.name === 'Susturuldu');

          if (!muteRole) {
            message.guild.roles.create({
              data: {
                name: 'Susturuldu',
                color: 'BLUE',
                
              },
              reason: 'sustur komutu için kullanılır.',
            })
            .then(console.log)
            .catch(console.error);

            message.guild.channels.cache.forEach(async (channel, id) => {
              await channel.overwritePermissions(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });

          }

          if (message.guild.channels.size < 2) return message.channel.send('Bir üyeyi susturmak için sunucuda birden fazla yazılı kanal olması lazım!');

          let targetUser = message.mentions.users.first();

          targetUser.roles.add(muteRole);


  
    
    
    }
};

// red tick 738143412783677480
// green tick 738140062432100372
