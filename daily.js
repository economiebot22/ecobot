const db = require("quick.db")
const moment = require("moment")

module.exports = {
    name: "dagelijks",
    description: "Ontvang je dagelijkse gratis geld",
    aliases: ["d"],
    cooldown: 3,
    execute(message) {
        const profiles = new db.table("profiles")

        const userProfile = profiles.get(`profiles_${message.author.id}`)

        if (userProfile == null) {
            return message.channel.send("Je hebt nog geen profiel.")
        }

        const dailyCoolDown = profiles.get(`profiles_${message.author.id}.dailycooldown`)

        if (Date.now() > dailyCoolDown || dailyCoolDown == undefined) {
            const randomNumber = Math.floor(Math.random() * 2000) + 1
            profiles.add(`profiles_${message.author.id}.money`, randomNumber)
            profiles.add(`profiles_${message.author.id}.totalmoney`, randomNumber)
            profiles.set(`profiles_${message.author.id}.dailycooldown`, Date.now() + 86400000)
            return message.channel.send(`
Je hebt ${randomNumber.toLocaleString()} ontvangen voor je dagelijkse prijs.
Kom over 24 uur terug om je volgende prijs te ontvangen.        
            `)
        } else {
            return message.channel.send(`
je kan je dagelijkse prijs weer ontvangen **${moment(dailyCoolDown).fromNow()}**
            `)
        }
    }
}