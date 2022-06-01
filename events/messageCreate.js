const client = require("..");
const Discord = require('discord.js')
const Topgg = require('@top-gg/sdk')
const { embed } = require("../settings/config");
const link = "dlt"

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  let prefix = ">";
  let discord = require('discord.js')
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  let mentionprefix = new RegExp(
    `^(<@!?${client.user?.id}>|${mentionprefixnew(prefix)})`
  );
  if (!mentionprefix.test(message.content)) return;
  const [, nprefix] = message.content.match(mentionprefix);
  if (nprefix.includes(client.user.id)) {
    message.reply({
      embeds: [
        new Discord.MessageEmbed()
        .setColor("#ff000")
        .setDescription(`**Hi <@${message.author.id}> I Am ${client.user.username} \n
        If you have Added me In Your Server And Unable to See Slash Commands wait 10s till it loads \n
        My Total Commands - \`${client.commands.map(a => a).length}\` \n
        My Prefix - \`/\` \n
        I Have Features Like <:sh_moderator:962339134406529054> Moderation, <:sh_automod:963823434406715403> Auto Moderation, <:sh_bl_security:967250077766799400> Security And Much More! \n
        To Get A List Of My Commands use \`/help\`**`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setFooter({
          text: `Thanks For Choosing Galactic`
        })
      ]
    });
     
    if(message.content.includes(link)){
      await message.delete()
      message.channel.send("Links Are Banned :sh_hehe:")
    }
    // messageCreate Event
    
  }
  const args = message.content.slice(nprefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command = client.mcommands.get(cmd);
    

      await command.execute(client, message, args);
    }
  
);

function mentionprefixnew(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

