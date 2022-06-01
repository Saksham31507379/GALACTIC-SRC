const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: `premium-perks`,
    description: `Display's the benifits of Premium`,
    run: async({ interaction }) => {
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<a:sh_premium:957639159890210928> **Perks Of Being A Premium User** <a:sh_premium:957639159890210928>`)
                .addField(`Premium Only Commands`, `<a:Arrow_White:958298411373834271> **Get Access To Premium Only Commands Like - \`profile\`**`, false)
                .addField(`Special Badge`, `<a:Arrow_White:958298411373834271> **Special Badge In Ur Profile!**`, false)
                .addField(`Priority Response`, `<a:Arrow_White:958298411373834271> **Priority Response To Premium Users**`, false)
                .addField(`Special Role`, `<a:Arrow_White:958298411373834271> **Premium Users Get Special & High Hoisted Role In Support Server**`)
                .addField(`Access To`, `<a:Arrow_White:958298411373834271> **Premium Users Can Have Access To \`vip-codes\` Channel**`, false)
                .addField(`No Errors`, `<a:Arrow_White:958298411373834271> **Premium Users Will Not Face Bugs, Errors & Glitches Of The Bot If Possible**`, false)
            ],
        })
    }
})