const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
    
    let cible = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let raison = args.slice(1).join(' ');
    let salon = message.guild.channels.find('name', 'signalement');
    message.delete().catch(O_o=>{});

    if(!args[0]) return message.channel.send({embed: {
      color: 4886754,
      title: "Information :information_source:",
      description: `**+signaler <@pseudo> <raison>** \n\n Tout abus du système de signalement sera **sanctionné** ${message.author}`,
      
    }}).then(message => message.delete(5000));
    
    /// ///

    if(!cible) return message.channel.send({embed: {
      color: 16724812,
      title: "Vous devez mentionner quelqu'un à signaler.",
  }}).then(message => message.delete(5000));

    /// /// 
    
    if(!raison) return message.channel.send({embed: {
      color: 16724812,
      title: "Vous devez saisir une raison.",
  }}).then(message => message.delete(5000));

    /// ///

    if(!salon) return message.channel.send({embed: {
      color: 16724812,
      title: "Impossible de trouver le salon de signalement.",
  }}).then(message => message.delete(5000));

    //////// EMBED ///////
    let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor("Signalement n° " + message.id, "https://i.gyazo.com/8ab11a4ba07f149fd9362b20ef94e309.png")
      .addField("Signalement par", `${message.author}`,true)
      .addField("Membre accusé", `${cible}`,true)
      .addField('Raison', raison,true)
      .addField('Envoyé depuis le salon textuel', message.channel)
      .setTimestamp()
      .setFooter("La POUCAVE");

      message.channel.send({embed: {
        color: 8311585,
        title: `Signalement pour ${cible.id} soumis, nous vous contacterons très prochainement.`,
    }}).then(message => message.delete(10000));

      salon.send(embed);
      console.log(`${message.author} à signalé ${cible} le `+ moment().format('YYYY-MM-DD'));
    
      return;

}
 
module.exports.help = {
  name: "signaler"
}