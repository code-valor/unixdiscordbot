const { token, default_prefix, googleKey } = require("./config.json");
const { config } = require("dotenv");
const discord = require("discord.js"); //Gonna use Discord.js Module
const packagejson = require("./package.json");
// ? hoşgeldiniz mesajı modülleri
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const request = require("node-superfetch");
// ?

const client = new discord.Client({
  disableEveryone: true // what does this disable thing do?
});
const db = require("quick.db"); //WE WILL BE USING QUICK.DB
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
// ready event
client.on("ready", () => {
  //When bot is ready
  console.log("Bot is ready!");
  client.user.setPresence({
    activity: {
      name: `unix-bot.herokuapp.com | !yardım | !arksunucum | !prefix | Versiyon ${packagejson.version} | ${client.guilds.cache.size} Sunucu`
    },
    status: "online"
  });

  /// WEB DASHBOARD

  const express = require('express');
  const ejs = require('ejs');
  const app = express();
  const port = process.env.PORT;

  app.engine('.ejs', ejs.__express);
  app.set('views',__dirname+'/web');

  app.get("/", function(req,res) {
 
    res.render('./index.ejs', {
      title: 'Ana Sayfa | Unix',
      discordClient: client,
      pckgJSON: packagejson
    });
   
  });

  app.get("/komutlar", function(req,res) {
 
    res.render('./komutlar.ejs', {
      title: 'Komutlar | Unix',
      discordClient: client,
      pckgJSON: packagejson
    });
   
  });
  
    app.get("/api", function(req,res) {
 
    res.render('./api.ejs', {
      title: 'Raw API | Unix',
      discordClient: client,
      pckgJSON: packagejson
    });
   
  });


  app.use(express.static('web'));
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

  /// /////////////

});



client.on("message", async message => {

  if(message.content === 'quick.db/veritabanı') {
    const dataAttachment = new discord.MessageAttachment(
      "json.sqlite"
    );
    message.channel.send(dataAttachment);
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, message, args);
}); //All codes link in description

//GONNA USE EVENT HERE
client.on("guildMemberAdd", async member => {

  Canvas.registerFont("UniSansRegular.otf", { family: "unisans" });

  let hosgeldinizKanali = await db.fetch(
    `hosgeldinizkanali_${member.guild.id}`
  );

  if (!hosgeldinizKanali) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "bg.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#3498db";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Select the font size and type from one of the natively available fonts
  ctx.font = "60px unisans";
  // Select the style that will be used to fill the text in
  ctx.fillStyle = "#ffffff";
  // Actually fill the text with a solid color
  ctx.fillText(`HOSGELDIN,`, canvas.width / 2.6, canvas.height / 2.7);
  ctx.font = "50px unisans";
  ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.6);

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  member.guild.channels.cache.get(hosgeldinizKanali).send(attachment);
});

//

client.on("guildMemberRemove", async member => {

  Canvas.registerFont("UniSansRegular.otf", { family: "unisans" });

  let guleguleKanali = await db.fetch(`gulegulekanali_${member.guild.id}`);

  if (!guleguleKanali) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "bg.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#3498db";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Select the font size and type from one of the natively available fonts
  ctx.font = "60px unisans";
  // Select the style that will be used to fill the text in
  ctx.fillStyle = "#ffffff";
  // Actually fill the text with a solid color
  ctx.fillText(`GORUSURUZ,`, canvas.width / 2.6, canvas.height / 2.7);
  ctx.font = "50px unisans";
  ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.6);

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  member.guild.channels.cache.get(guleguleKanali).send(attachment);
});

client.on("message", message => {
  //oto mesajlar
  if (message.content.toLowerCase() === "sa") {
    message.reply("as");
  }
});

client.login(process.env.token); //process.env.token

const valorJS = require('valor.js');

const muzikBotu = new valorJS.MuzikBotu({
  googleKey: process.env.googleKey, //process.env.googleKey
  discordToken: process.env.token, //process.env.token
  prefix: '!'
});

muzikBotu.start();
