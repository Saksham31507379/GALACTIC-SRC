const { Command } = require('reconlx');
const moment = require('moment')
const Discord = require('discord.js')
const { MessageEmbed, Formatters } = require("discord.js");
const { default: fetch } = require("node-fetch");
const config = require('../../config.json')
const prettyMilliseconds = require('pretty-ms')
const { userInfo } = require('os');
const client = require('../..');

module.exports = new Command({
    name: 'userinfo',
    description: `Get's some info about a user`,
    userPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botPermissions: ["EMBED_LINKS"],
    options: [
        {
            name: 'user',
            description: `Info about the user u want`,
            type: 'USER',
            required: true
        }
    ],
    run: async({ interaction }) =>{
        const user = interaction.options.getMember('user') || interaction.user
       const statuses = {
  online: "<:online:975037001524998194> Online",
  offline: "<:offline:975036845006159892> Offline",
  dnd: "<:dnd:975036844666413107> DND",
  idle: "<:idle:975036845094236190> Idle",
};

const flags = {
  DISCORD_EMPLOYEE: "<:employee:974687934252982342>",
  DISCORD_PARTNER: "<:partneredserverowner:974686102004834354>",
  BUGHUNTER_LEVEL_1: "<:bughunter:974686102638178365>",
  BUGHUNTER_LEVEL_2: "<:bughunter2:974686101669310516>",
  HYPESQUAD_EVENTS: "<:hypesquadevents:974686101975482448>",
  HOUSE_BRAVERY: "<:hypebravery:974686101962903642>",
  HOUSE_BRILLIANCE: "<:hypebrilliance:974686101874831480>",
  HOUSE_BALANCE: "<:hypebalance:974686101958709318>",
  EARLY_SUPPORTER: "<:earlysupporter:974686101853851769>",
  SYSTEM: "<:developer:974687011040526376>",
  VERIFIED_BOT:
    "<:verifiedbot1:974687683299393586><:verifiedbot2:974687670729072640>",
  VERIFIED_DEVELOPER: "<:developer:974687011040526376>",
  NITRO: "<:nitroclassic:974686101799329832>",
  BOOSTER_1: "<:serverbooster1:974686102000640060>",
  BOOSTER_2: "<:serverbooster2:974686102042574929>",
  BOOSTER_3: "<:serverbooster3:974686102071951390>",
  BOOSTER_4: "<:serverbooster4:974686102017425428>",
  BOOSTER_5: "<:serverbooster5:974686102126485554>",
  BOOSTER_6: "<:serverbooster6:974686102046797854>",
  BOOSTER_7: "<:serverbooster7:974686102063566898>",
  BOOSTER_8: "<:serverbooster8:974686101946138674>",
  BOOSTER_9: "<:serverbooster9:974686101933539358>",
};
         const roles = user.roles.cache
      .filter((x) => x.id !== interaction.guildId && !x.managed)
      .sort((a, b) => b.position - a.position)
      .map((x) => x.toString());

    const response = await fetch(
      `https://japi.rest/discord/v1/user/${user.id}`
    );
    const data = await response.json(); //public_flags_array

         const joinedAt = Formatters.time(user.joinedAt, "R");
    const createdAt = Formatters.time(user.createdAt, "R");

    let status = user.presence?.status;

    if (status === "dnd" || status === "idle" || status === "online")
      status = statuses[status];
    else if (
      status === "invisible" ||
      status === "offline" ||
      status === undefined
    )
      status = statuses["offline"];

    const badges = data.data.public_flags_array
      ? data.data.public_flags_array.map((flag) => flags[flag]).join(" ")
      : "No Badges.";
       try {
      const embed = new MessageEmbed()
        .setTitle("User Information")
        .setColor("RANDOM")
        .addFields([
          {
            name: "__User__",
            value: `
          **Username:** ${user.user.username}
          **Tag:** ${user.tag}
          **Discriminator:** ${user.user.discriminator}
          **ID:** ${user.id}
          **Permissions** ${user.permissionsIn(interaction.guild)}
          **Bot:** ${user.bot ? "Yes" : "No"}
          **System:** ${user.system ? "Yes" : "No"}
          **Created At:** ${createdAt}
          **Avatar:** [Link Here](${user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })})
          **Status:** ${status}
          **Activivty:** ${
            user.presence?.activities[0]
              ? user.presence?.activities[0].name
              : "No Current Activity."
          }
          **Badges:** ${badges}
          `,
          },
          {
            name: "__User Bio__",
            value: `${data.data.bio || "```No Bio Set.```"}`,
          },
          {
            name: "__Server Member__",
            value: `
          **Display Name:** ${user.displayName}
          **Joined At:** ${joinedAt}
          **Highest Role:** ${
            user.roles.highest.id === interaction.guild.id
              ? "No Highest Role."
              : user.roles.highest
          }
          **Hoist Role:** ${
            user.roles.hoist ? user.roles.hoist : "No Hoist Role."
          }
          `,
          },
        ])
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `Requested By: ${interaction.user.tag}` });
      interaction.followUp({
        embeds: [embed],
      });
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: `An error occured while running this command: \`\`\`${error}\`\`\``,
      });
    }
    }
    
})
