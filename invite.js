const discord = require("discord.js");
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "invite",
    description: "Geeft handige links",
    aliases: ["i"],
    cooldown: 3,
    execute(message) {

        var botEmbed = new discord.MessageEmbed()
            .setColor("#32a852")
            .setTitle("Invites")
            .addFields(
                { name: "Dit is de link van de officiële economie bot", value: "[Economie Bot](https://discord.com/oauth2/authorize?client_id=733322487139532800&scope=bot&permissions=66583880)" },
                { name: "Dit is de link van de officiële giveaway bot", value: "[Giveaway Bot](https://discordapp.com/oauth2/authorize?client_id=730445459159777350&scope=bot&permissions=2080898303)" },
                { name: "Dit is de officiële support server van de bot", value: "[Support Server](https://discord.gg/2E5fhn3)" },
            )
            .setThumbnail("https://media.discordapp.net/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            //.setImage("https://cdn.discordapp.com/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            .setFooter("Bot is gemaakt door @Daniël#2939") //, "https://cdn.discordapp.com/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            .setTimestamp()

        return message.channel.send(botEmbed);
    }
}