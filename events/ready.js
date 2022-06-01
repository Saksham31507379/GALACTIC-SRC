const { shard } = require("..");
const client = require("..");
const Nuggies = require("nuggies")

 let mcount = 0;
    client.guilds.cache.forEach((guild) => {
     const users =  mcount += guild.memberCount;
    });
const statsuser = client.users.cache.get("788745942777462794")
const botu = client.users.cache.size
const cfonts = require('cfonts');
const banner = cfonts.render((`Online`), {
		font: 'block',
		color: 'candy',
		align: 'left',
		gradient: ["white", "cyan"],
		lineHeight: 3
	});
console.log(banner.string); 

client.on("ready", async () => {
  
  console.log(banner.string); 
   client.user.setPresence({ activities: [{ type: 'WATCHING', name: `/help` }], status: 'idle' })
   client.user.setUsername("Galactic")
  
   
   //Token : OTM1NDMyNzcwODc5MTE5NDMw.Ye-jqA.l_VZcuTqpBeioE_24uI2HB-nmSM
   console.log(` ${client.user.tag}`)
    console.log(`_______________________________________${process.version}________________________________`)
   require("../index")
})