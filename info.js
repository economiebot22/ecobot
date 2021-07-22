const discord = require("discord.js");
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "info",
    description: "Geeft handige links",
    aliases: ["in"],
    cooldown: 3,
    execute(message) {

        var botEmbed = new discord.MessageEmbed()
            .setColor("#32a852")
            .setTitle("Info")
            .addFields(
                { name: "Bot naam", value: "Economie bot" },
                { name: "Gemaakt door", value: "@Daniël#2939" },
                { name: "Aantal servers", value: "85" },
                { name: "De bot heeft het verify vinkje voor:", value: "17-10-2020" }
            )
            .setThumbnail("https://media.discordapp.net/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            //.setImage("https://cdn.discordapp.com/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            .setFooter("Bot is gemaakt door @Daniël#2939 || De aantal servers worden 1 keer per dag bijgewerkt handmatig (niet automatisch), dit geld alleen voor deze bot van Daniël Bots Support.") //, "https://cdn.discordapp.com/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
        return message.channel.send(botEmbed);
    }
}