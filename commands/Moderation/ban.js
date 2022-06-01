const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
    name: 'ban',
    description: 'Bans A User',
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS"],
    options: [
        {
            name: 'user',
            description: 'User To Be Banned',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for which you are Banning The User',
            type: 'STRING',
            required: false
        }
    ],
    run: async({ interaction }) => {
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id)

        if (user.id === interaction.guild.ownerId){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription(`<a:Cross:948849995405209630> | **${user} is Owner Of This Guild Unable To Ban!**`)
                ]
            });
          };

          if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp(`You Dont Have \`BAN_MEMBERS\` Permissions to use this command`)

          if(!member.manageable){
              return interaction.followUp({
                  embeds: [
                      new Discord.MessageEmbed()
                      .setColor(`BLURPLE`)
                      .setDescription(`I Can't Ban This Member Plz Check That I Have Higher Role than this user`)
                  ]
              })
          }

          if(user.id === "852771983170994186"){
              return interaction.followUp({
                  embeds: [
                      new Discord.MessageEmbed()
                      .setColor(`RANDOM`)
                      .setDescription(`I Cant Ban ${user.tag} He Is My Owner`)
                  ]
              })
          }

          if (user.id === "788745942777462794"){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`RANDOM`)
                    .setDescription(`<a:Cross:948849995405209630> |** ${user.tag} is My Developer I Can't Ban Them!**`)
                ]
            })
          };

          if (user.id === interaction.user.id){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription(`<a:Cross:948849995405209630> | **You Can't Ban Yourself**`)
                ]
            })
          };

          if(user.bannable){
              return interaction.followUp({
                  embeds: [
                      new Discord.MessageEmbed()
                      .setColor("#ff000")
                      .setDescription(`I Can't Ban That user`)
                  ]
              })
          }

          if(user.id === "935432770879119430"){
              return interaction.followUp({
                  embeds: [
                      new Discord.MessageEmbed()
                      .setColor("#ff0000")
                      .setDescription(`**Are You Comedy Me ?**`)
                  ]
              })
          }
          
          
        member.ban();
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`<a:tick:946092639453872200> - **${user.tag} was Banned** | ${reason || "**No Reason Provided!**"}`)
            ]
        })
        console.log(`${user.tag} Was Banned By ${interaction.user.tag}`)
    }
})