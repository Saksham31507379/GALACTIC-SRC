const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
    name: 'kick',
    description: 'Kicks A User',
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["KICK_MEMBERS"],
    options: [
        {
            name: 'user',
            description: 'Member to kick',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for which you are kicking this member',
            type: 'STRING',
            required: false
        }
    ],
    run: async({ interaction }) => {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id);
       
        if(!member.manageable){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`BLURPLE`)
                    .setDescription(`I Can't Kick ${member} As He Has <@&${member.roles.highest.id}> Role Which Is Higher Than me`)
                ]
            })
        };
        if(user.id === "788745942777462794"){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`BLURPLE`)
                    .setDescription(`I Can't Kick My Developers`)
                ]
            })
        }
        member.kick(reason);
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`<:Tick:947860012347310100> | **${user.tag} Was Kicked | ${reason || "**No Reason Was Provided!**"}**`)
            ]
        })
        user.send({
            embeds: [
                new Discord.MessageEmbed()
                .setColor('BLURPLE')
                .setDescription(`**You Were Kicked In ${interaction.guild.name}**`)
                .setThumbnail(`${interaction.guild.iconURL({dynamic: true})}`)
                .addFields(
                    {
                        name: 'Moderator',
                        value: `${interaction.user.tag}`
                    },
                    {
                        name: 'reason',
                        value: `\`\`\`js\n${reason}\`\`\``
                    }
                )
            ]
        })
        console.log(`${user.tag} was kicked By ${interaction.user.tag} | ${reason} In ${interaction.guild.name}`)
    }
})