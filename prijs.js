const discord = require("discord.js");
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "prijs",
    description: "Win 10.000 euro",
    aliases: ["pr"],
    cooldown: 3,
    execute(message) {

        var botEmbed = new discord.MessageEmbed()
            .setColor("#32a852")
            .setTitle("Prijs")
            .addFields(
                { name: "Je krijgt 10.000 euro erbij als je de support server joint!",  value: "[Support Server](https://discord.gg/2E5fhn3)"}
            )
            .setThumbnail("https://media.discordapp.net/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            //.setImage("https://cdn.discordapp.com/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            .setFooter("Claim je prijs door een ticket in de support server aan te maken") //, "https://cdn.discordapp.com/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            .setTimestamp()

        return message.channel.send(botEmbed);
    }
}