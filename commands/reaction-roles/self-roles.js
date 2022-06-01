const { Command } = require("reconlx");
const Discord = require('discord.js')
const config = require('../../config.json');
const {
  MessageEmbed,
  CommandInteraction,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = new Command({
  // options
  name: "self-roles",
  description: `Create's A Dropdown menu selection for roles`,
  userPermissions: ["MANAGE_GUILD"],
  voteOnly: true,
  options: [
    {
      name: 'embedtitle',
      description: `Title to be set In embed`,
      type: 'STRING',
      required: true
    },
    {
      name: `description`,
      description: `Description to be set in embed`,
      type: 'STRING',
      required: true
    },
    {
      name: 'emoji',
      description: `Set's emoji for dropdown menu`,
      type: 'STRING',
      required: true
    }
  ],
  // command start
  run: async ({ client, interaction, args }) => {
    // Code
    const embedtitle = interaction.options.getString('embedtitle')
    const description = interaction.options.getString('description')
    const embedemoji = interaction.options.getString('emoji')
    const arrayOfRoles = [];
    let counter = 0;
    let filtermsg = (m) => m.author.id === interaction.user.id;
    let embed = new MessageEmbed().setColor("RANDOM");

    let mainMsg = await interaction.channel.send({
      embeds: [new MessageEmbed().setTitle(`STARTED NOW`).setFooter({
        text: `Note: You Need to vote me to use this command`,
        iconURL: `${client.user.displayAvatarURL({dynamic: true})}`
      })],
    });

    ask_addrole();

    async function ask_addrole() {
      counter++;
      if (counter === 23) {
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`You Cant Add More Roles At This Moment`)
            ],
        ephemeral: true});
        return Finsihed(interaction);
      }
      await mainMsg
        .edit({
          embeds: [
            embed
              .setTitle(`What should be the ${counter} Role`)
              .setColor("BLURPLE")
              .setFooter(`Note You Can Add Up to 23Roles At A Time`)
              .setDescription(
                "Send `done` to end this process"
              ),
          ],
        })
        .then(async (msg) => {
          await msg.channel
            .awaitMessages({
              max: 1,
              time: 180000,
              errors: ["TIME"],
              filter: filtermsg,
            })
            .then((collected) => {
              collected
                .first()
                .delete()
                .catch((e) => {});
              if (collected.first().content.toLowerCase() === "done") {
              
                return Finsihed(interaction);
              } else {
                let role = collected.first().mentions.roles.first();
                switch (counter) {
                  case 1:
                    arrayOfRoles.push(role.name);
                    break;
                  case 2:
                    arrayOfRoles.push(role.name);
                    break;
                  case 3:
                    arrayOfRoles.push(role.name);
                    break;
                  case 4:
                    arrayOfRoles.push(role.name);
                    break;
                  case 5:
                    arrayOfRoles.push(role.name);
                    break;
                  case 6:
                    arrayOfRoles.push(role.name);
                    break;
                  case 7:
                    arrayOfRoles.push(role.name);
                    break;
                  case 8:
                    arrayOfRoles.push(role.name);
                    break;
                  case 9:
                    arrayOfRoles.push(role.name);
                    break;
                  case 10:
                    arrayOfRoles.push(role.name);
                    break;
                  case 11:
                    arrayOfRoles.push(role.name);
                    break;
                  case 12:
                    arrayOfRoles.push(role.name);
                    break;
                  case 13:
                    arrayOfRoles.push(role.name);
                    break;
                  case 14:
                    arrayOfRoles.push(role.name);
                    break;
                  case 15:
                    arrayOfRoles.push(role.name);
                    break;
                  case 16:
                    arrayOfRoles.push(role.name);
                    break;
                  case 17:
                    arrayOfRoles.push(role.name);
                    break;
                  case 18:
                    arrayOfRoles.push(role.name);
                    break;
                  case 19:
                    arrayOfRoles.push(role.name);
                    break;
                  case 20:
                    arrayOfRoles.push(role.name);
                    break;
                  case 21:
                    arrayOfRoles.push(role.name);
                    break;
                  case 22:
                    arrayOfRoles.push(role.name);
                    break;
                  case 23:
                    arrayOfRoles.push(role.name);
                    break;
                    case 24:
                    arrayOfRoles.push(role.name);
                    break;
                    case 25:
                    arrayOfRoles.push(role.name);
                    break;
                }
                ask_addrole();
              }
            })
            .catch((error) => {
              return interaction.followUp({
                  embeds: [
                      new Discord.MessageEmbed()
                      .setColor(`BLURPLE`)
                      .setDescription(`Timeout! Plz Use This Command Again!`)
                  ],
              });
            });
        });
    }

    function Finsihed(interaction) {
      // code
        interaction.channel.send({
          embeds: [
              new Discord.MessageEmbed()
              .setColor('BLURPLE')
              .setDescription(`**Created Role Menu in <#${interaction.channel.id}>**`)
          ]
      })
     self_roles(interaction, arrayOfRoles);
    }
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Array} roles
     */
    async function self_roles(interaction, roles) {
      if (!roles || !interaction)
        throw new Error("An Error has Occured Plz Try Again Later!");
      if (roles.length > 25)
        throw new Error(
          "You Can Create Up To 25 Roles At A Time"
        );

      let arr = [];

      roles.forEach((role) => {
        arr.push({
          label: role.charAt(0).toUpperCase() + role.slice(1),
          description: `Click To Get ${role}`,
          value: role,
          emoji: `${embedemoji || "<:sh_invisible:957151516031090709>"}`
        });
      });

      let selectMenu = await Create_menu({
        id: "Self-roles",
        placeHolder: "Take Your Roles ",
        array: arr,
      });
      interaction.channel.send({
        embeds: [
            new Discord.MessageEmbed()
            .setColor('BLURPLE')
            .setTitle(`${embedtitle}`)
            .setDescription(`${description}`)
            .setTimestamp()
            .setFooter(
                {
                    text: `Thanks For Choosing ${client.user.username}`,
                    iconURL: `${client.user.displayAvatarURL({dynamic: true})}`
                }
            )
        ],
        components: [selectMenu],
      });
    }

    async function Create_menu({ id, placeHolder, array }) {
      if (!id || !array)
        throw new Error(
          "The options were not provided! Make sure you provide all the options!"
        );
      //if(typeof roles != 'object') throw new Error(chalk.red.bold('Please provide the roles as an array!'));
      if (array.length < 0)
        throw new Error(`The array has to have atleast one thing to select!`);
      let select_menu;

      placeHolder = placeHolder ? placeHolder : "Nothing Selected";
      array.forEach((item) => {
        if (!item.label)
          throw new Error(
            `The array must have objects, with the following options: (label, description and value) !!`
          );
        if (!item.description)
          throw new Error(
            `The array must have objects, with the following options: (label, description and value) !!`
          );
        if (!item.value)
          throw new Error(
            `The array must have objects, with the following options: (label, description and value) !!`
          );
      });

      select_menu = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId(id)
          .setPlaceholder(placeHolder)
          .addOptions(array)
      );

      return select_menu;
    }
  },
});




// interaction event code

const client = require('../../index');

client.on("interactionCreate", async (interaction) => {
  if (!interaction.guild || interaction.user.bot) return;
  if (interaction.isSelectMenu()) {
    await interaction.deferUpdate().catch((e) => {});
    if (interaction.customId === "Self-roles") {
      let value = interaction.values[0];
      let role = interaction.guild.roles.cache.find(
        (r) => r.name.toLowerCase() === value.toLowerCase()
      );
      if (!role) {
        role = await interaction.guild.roles.create({
          name: value,
          permissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
        });
      }

      if (!interaction.member.roles.cache.has(role.id)) {
        await interaction.member.roles.add(role.id);
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(`BLURPLE`)
                .setDescription(`Hurray! ${interaction.user} You Got ${role}`)
            ],
        ephemeral: true});
      } else {
        await interaction.member.roles.remove(role.id);
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`Oops! You Just Lost A Role ${role} <:sh_sadP:957155057047076924>`)
            ],
        ephemeral: true}).catch((err) => {
          interaction.channel.send({
              embeds: [
                  new Discord.MessageEmbed()
                  .setColor("ff0000")
                  .setTitle("ERROR!")
                  .setDescription(`\`\`\`${err}\`\`\``)
                  .setFooter('use /report to report this bug')
              ],
          ephemeral: true})
          console.log(`Logged Error And Sent Empeheral Message  Cmd executed by ${interaction.user.tag} Error Was: ${err}`)
      });
      }
    }
  }
})