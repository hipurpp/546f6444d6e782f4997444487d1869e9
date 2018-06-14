const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {

    if(message.author.id == "387696971462344705")
    {
        let salon_sondages = message.guild.channels.find('name', 'sondages');
        let args = message.content.split(" ").slice(1);
        let contenu = args.join(" ")
        message.delete().catch(O_o=>{});
        
    
        if(!contenu) return message.channel.send("Vous devez écrire du texte.").then(message => message.delete(5000));
    
        if(!salon_sondages) return message.channel.send("Impossible de trouver le salon.").then(message => message.delete(5000));
    
        let embed = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(`Sondage par ${message.author.username}`, "https://image.flaticon.com/icons/png/512/309/309671.png")
          .addField(contenu, "Vous devez répondre avec les réactions.")
    
        salon_sondages.send(embed).then(async function (message) {
            message.react("1⃣");
            message.react("2⃣");
             await message.channel.send('@everyone');
           });
    
         console.log(`${message.author} a créé un sondage le `+ moment().format('YYYY-MM-DD'));
    }
    else
    {
      message.channel.send(`Seul le propriétaire du BOT peut utiliser cette commande.`).then(message => message.delete(5000));
}

}
 
module.exports.help = {
  name: "sondage",
  description: 'Faire un sondage',
  usage: '+sondage <texte>',
  aliases: ['SONDAGE'],
}
