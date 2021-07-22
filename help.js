module.exports = {
    name: "help",
    description: "Een lijst met alle commando's",
    aliases: ["h"],
    cooldown: 3,
    execute(message, args, client) {
        const name = args[1]
        const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name))

        if (!command) {
            return message.channel.send(`Hier zijn alle commando's: \n${client.commands.map(c => c.name).join("**\n - **")}`)
        }

        var data = []

        data.push(`**Naam:** ${command.name}`)

        if (command.aliases) data.push(`**Afkorting:** ${command.aliases.join(", ")}`)
        if (command.description) data.push(`**Beschrijving:** ${command.description}`)
        if (command.cooldown) data.push(`**Afkoeling:** ${command.cooldown} seconden`)

        return message.channel.send(data, { split: true })
    }
}