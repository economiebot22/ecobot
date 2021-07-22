const { execute } = require("./newprofile")

module.exports = {
    name: "verwijder-account",
    description: "Verwijder je profiel",
    aliases: ["verwijderacc"],
    cooldown: 3,
    async execute(message) {
        const db = require('quick.db')
        const profiles = new db.table("profiles")

        const userProfiles = profiles.get(`profiles_${message.author.id}`)

        if (userProfiles == null) return message.channel.send("Je hebt geen account.")

        const msg = await message.channel.send("Weet je zeker dat je je profiel wilt verwijderen?")
        await msg.react("✅")
        await msg.react("❌")

        const filter = (reaction, user) => {
            return (reaction.emoji.name == "✅" || reaction.emoji.name == "❌") && user.id == message.author.id
        }

        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
            .then(reaction => {
                if (reaction.first().emoji.name == "✅") {
                    profiles.delete(`profiles_${message.author.id}`)
                    return message.channel.send("Je profiel is verwijdert.")
                } else if (reaction.first().emoji.name == "❌") {
                    return message.channel.send("Je profiel is toch niet verwijdert.")
                }
            })
            .catch(() => {
                return message.channel.send("Canceling due to the fact that you ran out of time to respond")
            })
    }
}