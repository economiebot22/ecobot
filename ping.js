module.exports = {
    name: "ping",
    description: "ponnnnng!",
    aliases: ["p"],
    cooldown: 3,
    execute(message) {
        return message.channel.send("🏓Pong!")
    }
}