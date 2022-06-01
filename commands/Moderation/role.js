const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const { userInfo } = require('os');

module.exports = new Command({
    name: 'role',
    description: `Give's A Specific role to a User`,
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANANGE_ROLES"],
    options: [
        {
            name: 'user',
            description: 'User To Give Role',
            type: 'USER',
            required: true,
        },
        {
            name: 'role',
            description: 'Role To Be Given',
            type: 'ROLE',
            required: true,
        }
    ],
    run: async({ interaction }) => {
        const user = interaction.options.getUser('user')
        const role = interaction.options.getRole('role')
        const member = interaction.guild.members.cache.get(user.id)

        

        if(!member.roles.cache.has(role)){
       await member.roles.add(role);
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`<:Tick:947860012347310100> | Changed Role for ${user.username}, +${role.name}`)
            ]
        })
}
        if(member.roles.cache.has(role)){
           await member.roles.remove(role)
            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription((`<:Tick:947860012347310100> | Changed Role for ${user.tag}, -${role.name}`))
                ]
            })
        }
        
    }
})