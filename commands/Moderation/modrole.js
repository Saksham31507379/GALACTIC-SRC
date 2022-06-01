const { Command } = require('reconlx');
const ee = require(`../../settings/config`).embed
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require('pretty-ms');
const { Permissions } = require('discord.js')

module.exports = new Command({
    name: 'modrole',
    description: `Set's modrole for server  | Able To use moderation commands`,
    userPermissions: ["MANAGE_GUILD"],
    options: [
        {
            name: 'role',
            description: `Role to be set as modrole`,
            type: 'ROLE',
            required: true
        }
    ],
    
    run: async ({ interaction }) => {
        
        let crrole = interaction.options.getRole('role')
        let role = interaction.guild.roles.cache.get(crrole.id)
 
       role.edit({
             permissions: [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.ADD_REACTIONS, Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS, Permissions.FLAGS.MODERATE_MEMBERS, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.CHANGE_NICKNAME, Permissions.FLAGS.MANAGE_NICKNAMES],
             reason: `ModRole By - ${interaction.user.tag}`,
             color: "ff000",
             hoist: true
         })
         interaction.followUp(`${crrole} Is A Modrole`)
    }
})