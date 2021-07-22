const db = require("quick.db")

module.exports = {
    name: "nieuwaccount",
    description: "Maak een profiel aan",
    aliases: ["nieuwacc"],
    cooldown: 3,
    execute(message) {
        const profiles = new db.table("profiles")

        const userProfile = profiles.get(`profiles_${message.author.id}`)

        if (userProfile) return message.channel.send("Je hebt al een profiel.")

        message.channel.send("Stuur een naam voor jou profiel naam.")

        const filter = (user) => {
            return user.author.id == message.author.id
        }

        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
            .then(collected => {
                const name = collected.first().content
                const regex = !/[^a-zA-Z0-9 ]+/g.test(name)

                if (!regex) return message.channel.send("Je naam kan alleen bestaan uit nummers en letters.")

                profiles.set(`profiles_${message.author.id}.name`, name)
                profiles.set(`profiles_${message.author.id}.money`, 50)
                profiles.set(`profiles_${message.author.id}.bought.pistol`, 1)
                profiles.add(`profiles_${message.author.id}.totalmoney`, 50)

                return message.channel.send(`Je profiel is aangemaakt met de naam, **${name}**`)
            })
            .catch(() => {
                return message.channel.send("Het heeft te lang geduurt.")
            }
        )
    }
}