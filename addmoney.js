const db = require("quick.db")

module.exports = {
    name: "toevoegen-geld",
    description: "Geld toevoegen aan een speler (Alleen @Daniël#2939 kan dit)",
    aliases: ["toevoegeng"],
    cooldown: 5,
    execute(message, args) {
        //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("sorry, jij kan dit niet gebruiken.");

        const profiles = new db.table("profiles")

        const member = message.mentions.members.first() || message.member

        const memberProfile = profiles.get(`profiles_${member.id}`)
        
        if (message.author.id !== "718757668713398283") return message.reply("Sorry, alleen @Daniël#2939 kan geld toevoegen.");

        if (!memberProfile) return message.channel.send("Deze persoon heeft nog geen profiel.")

        if (!args[1]) return message.channel.send("Je moet een getal opgeven om op te geven hoeveel geld er erbij moet komen.")

        if (isNaN(args[1]) || args[1] < 0) return message.channel.send("Je moet een getal geven boven 0.")
        
        profiles.add(`profiles_${member.id}.money`, args[1])

        profiles.add(`profiles_${member.id}.totalmoney`, args[1])

        return message.channel.send(`Voegt €${args[1].toLocaleString()} toe bij ${member}!`)
    }
}