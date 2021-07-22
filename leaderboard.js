const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "scorebord",
    description: "Kijk de scorebord voor wie het meeste geld heeft",
    aliases: ["sb"],
    cooldown: 3,
    execute(message) {
        const profiles = new db.table("profiles")

        const leaderboardMoney = profiles.all().sort((a, b) => b.data.money - a.data.money)

        if (!leaderboardMoney) {
            return message.channel.send("Niemand heeft een profiel.")
        }

        const leaderboardTotalMoney = profiles.all().sort((a, b) => b.data.totalmoney - a.data.totalmoney)

        const top5Money = leaderboardMoney.slice(0, 5)
        const top5TotalMoney = leaderboardMoney.slice(0, 5)

        var i = 0
        var o = 0

        return message.channel.send(new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Scorebord - Top 5")
            .setThumbnail("https://media.discordapp.net/attachments/738428731755986995/754945490696536166/Logopit_1600063423547.png?width=475&height=475")
            .addFields(
                {
                    name: "Geld",
                    value: top5Money.map(item => `${i++} - ${item.data.name} - €${item.data.money.toLocaleString()}`)
                },
                {
                    name: "Geld totaal",
                    value: top5TotalMoney.map(item => `${o++} - ${item.data.name} - €${item.data.totalmoney.toLocaleString()}`)
                }
            )
            .setThumbnail("https://media.discordapp.net/attachments/738428731755986995/758567210318299166/economie_bot.png?width=475&height=475")
        ) 
    }
}