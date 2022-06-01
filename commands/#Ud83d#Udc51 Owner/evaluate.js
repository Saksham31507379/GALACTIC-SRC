const { Command } = require("reconlx")
const { MessageEmbed, MessageActionRow, MessageButton, Client } = require("discord.js")
const client = require("../../index")
module.exports = new Command({
    name: `eval`,
    description: `Eval's a code`,
    ownerOnly: true,
    options: [
        {
            name: 'code',
            description: `code to be evaluated`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        
           
         const button = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel("Delete")
             .setCustomId("eval")
            .setStyle("DANGER")
            .setEmoji("<:sh_cross:958962612454961182>")
        )
         
        const code = interaction.options.getString('code')
        

        let output = await new Promise((resolve, reject) => resolve(eval(code)))

        if(typeof output !== "string"){

            output = require("util").inspect(output, { depth: 0 });

             interaction.followUp({
              embeds: [
                  new MessageEmbed()
                  .setColor("BLUE")
                  .setTitle(`Evaled!`)
                  .setDescription(`\`\`\`js\n${output}\`\`\``)
              ],
                components: [button], ephemeral: true
          })
          if(interaction.isButton()){
            if(interaction.user.id !== "788745942777462794"){
              return interaction.followUp({content: `You Can't Use This button`, ephemeral: true})
            }
            if(interaction.customId === "eval"){
              msg.delete()
            }
          }
            

   

            
            
        }
    }
})