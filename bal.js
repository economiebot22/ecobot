const db = require("quick.db")

module.exports = {
    name: "balans",
    description: "Zien hoeveel geld je hebt",
    aliases: ["b"],
    cooldown: 3,
    execute(message) {
        const profiles = new db.table("profiles")

        const member = message.mentions.members.first() || message.member

        const memberProfile = profiles.get(`profiles_${member.id}`)

        if (!memberProfile) return message.channel.send("Deze persoon heeft nog geen profiel.")

        const bal = profiles.get(`profiles_${member.id}.money`) || 0

        return message.channel.send(`${member} heeft €${bal.toLocaleString()} euro.`)
    }
}