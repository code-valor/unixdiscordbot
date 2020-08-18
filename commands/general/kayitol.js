const db = require("quick.db")
const { default_prefix } = require("../../config.json")

module.exports = {
  name: "kayıtol",
  category: "Genel",
  usage: "kayıtol <isminiz> <yaşınız>",
  description: "Sizi sunucuya İsminiz/Yaşınız şeklinde kaydeder.",
  run: async (client, message, args) => {
  
  if(!args[0]) return message.channel.send('Lütfen isminizi belirtin!');
  if(!args[1]) return message.channel.send('Lütfen yaşınızı belirtin!');
  
  await if(args[0] && args[1]) { message.author.setNickname(`${args[0]}/${args[1]}`); message.channel.send(`Başarıyla kayıt oldunuz, ${args[0]}!`); };
  
}
};
  
  // red tick 738143412783677480
  // green tick 738140062432100372
