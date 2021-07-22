const db = require("quick.db")

module.exports = {
    name: "geef",
    description: "Geef andere leden wat geld",   
    aliases: ["g"],
    cooldown: 3,
    execute(message, args) {
        const profiles = new db.table("profiles")

        const mentionedMember = message.mentions.members.first()

        if (!mentionedMember) return message.channel.send("Je moet een persoon taggen om geld te kunnen geven.")

        const mentionedMemberProfile = profiles.get(`profiles_${mentionedMember.id}`)
        
        const messageMemberProfile = profiles.get(`profiles_${message.member.id}`)

        if (!mentionedMemberProfile) return message.channel.send("Deze persoon heeft geen profiel.")

        if (!messageMemberProfile) return message.channel.send("Je hebt geen profiel.")

        if (mentionedMember.id == message.member.id) return message.channel.send("Je kan geen geld geven aan je zelf.")

        if (!args[1]) return message.channel.send("Je moet schrijven, hoeveel geld je wilt geven.")

        if (isNaN(args[1])) return message.channel.send("Dat is niet een geldig getal om er geld mee te geven.")

        if (args[1] < 0) return message.channel.send("Je moet meer dan 0 euro geven.")

        profiles.subtract(`profiles_${message.member.id}.money`, args[1])

        profiles.add(`profiles_${mentionedMember.id}.money`, args[1])

        profiles.add(`profiles_${mentionedMember.id}.totalmoney`, args[1])

        return message.channel.send(`Toegevoegd **${args[1].toLocaleString()}** euro aan ${mentionedMember}`)
    }
}