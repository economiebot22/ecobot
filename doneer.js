const discord = require("discord.js");
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "doneer",
    description: "Geeft handige links",
    aliases: ["don"],
    cooldown: 3,
    execute(message) {

        var doneerEmbed = new discord.MessageEmbed()
            .setTitle("Doneren:")
            .setColor("#42ecf5")
            .addFields(
                { name: "Je kan met behulp van deze link doneren:", value: "[Klik Hier!](https://www.paypal.com/pools/c/8qTBufxoDC)" }
            )
            .setThumbnail("https://media.discordapp.net/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            //.setImage("https://cdn.discordapp.com/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            .setFooter("Bot is gemaakt door @Daniël#2939") //, "https://cdn.discordapp.com/attachments/719562600282849324/728585483118051368/BOT_NU_g_OE_d.jpg")
            .setTimestamp()

        return message.channel.send(doneerEmbed);
    }
}



// const discord = require("discord.js");

// module.exports.run = async (client, message, args) => {

    // var doneerEmbed = new discord.MessageEmbed()
    // .setTitle("Doneren:")
    // .setColor("#42ecf5")
    // .addFields(
    // { name: "Je kan met behulp van deze link doneren:", value: "[Klik Hier!](https://www.paypal.com/pools/c/8qTBufxoDC)"}
    // )

// return message.channel.send(doneerEmbed);
// }

// module.exports.help = {
//     name: "doneer"
// }