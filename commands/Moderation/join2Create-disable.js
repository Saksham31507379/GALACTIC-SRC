const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js")
const schema = require("../../Models/join2Create")

module.exports = new Command({
    name: `join2create-disable`,
    description: `dissable's join2create`,
    userPermissions: ["MANAGE_GUILD"],
    
    run: async({ interaction }) => {

        schema.findOne({
            Guild: interaction.guildId,
        }, async(err, data) => {
            if(!data){
                interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                        .setColor('BLUE')
                        .setDescription(`No Join 2 Create Voice Channel is Setted for this server`)
                    ]
                })
            }
            if(data){
                await data.delete();
            }
        })
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`Disbaled Join2Create System`)
            ]
        })
    }
})