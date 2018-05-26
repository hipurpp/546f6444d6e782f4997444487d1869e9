const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log(`Impossible de trouver les fichiers de commandes | Erreur le `+ moment().format('YYYY-MM-DD'));
      return;
    }
  
    jsfile.forEach((f, i) =>{ 
      let props = require(`./commands/${f}`);
      console.log(`Le fichier ${f} est maintenant chargé.`);
      bot.commands.set(props.help.name, props);
    });
  });

  bot.on("ready", async () => {
    console.log(`${bot.user.username} est maintenant en ligne et opérationnel | Démarrage effectué le `+ moment().format('YYYY-MM-DD'));
    bot.user.setActivity("le peuple | +signaler", {type: "WATCHING"});
  
  });

  bot.on('disconnect', () =>{
    console.log(`Déconnexion à : ${new Date()}`);
  });
  
  bot.on('reconnecting', () => {
    console.log(`Reconnexion à : ${new Date()}`);
  });

  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = "+";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    
  
  });
  
  bot.login(process.env.TOKEN);
