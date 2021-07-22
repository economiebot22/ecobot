const db = require("quick.db")

module.exports = {
    name: "verwijder-geld",
    description: "Verwijder geld van een gebruiker (alleen @Daniël#2939 kan dit)",
    aliases: ["verwijderg"],
    cooldown: 3,
    execute(message, args) {
        //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("sorry, jij kan dit niet gebruiken.");

        const profiles = new db.table("profiles")

        const member = message.mentions.members.first() || message.member

        const memberProfile = profiles.get(`profiles_${member.id}`)

        if (message.author.id !== "718757668713398283") return message.reply("Sorry, alleen @Daniël#2939 kan geld toevoegen.");

        if (!memberProfile) return message.channel.send("Deze persoon heeft geen profiel.")

        if (!args[1]) return message.channel.send("Je moet een getal opgeven om op te geven hoeveel geld er weggehaald moet worden.")

        if (isNaN(args[1]) || args[1] < 0) return message.channel.send("Je moet een getal geven boven 0.")

        const oldbal = profiles.get(`profiles_${member.id}.money`)

        if (oldbal - args[1] < 0) return message.channel.send("Ik kan niet zoveel weghalen, als de balance onder de 0 gaat.")

        profiles.subtract(`profiles_${member.id}.money`, args[1])

        return message.channel.send(`Hield €${args[1].toLocaleString()} af van ${member}.`)
    } 
}