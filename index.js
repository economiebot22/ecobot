const Discord = require("discord.js")
const client = new Discord.Client()
const { token } = require("./botConfig.json")
const fs = require("fs")

client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);
    let activities = ["49 servers", "$help", "prefix $", "Economie Bot",]
    i = 0;
    setInterval(() => {
        client.user.setPresence({
            activity: {
                name: activities[i++ % activities.length],
                type: "PLAYING"
            }
        })
    }, 50000);

});

const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}
fs.readdir("./events/", (err, files) => {
    if (err) return console.log(err)
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        const event = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, event.bind(null, client))
        delete require.cache[require.resolve(`./events/${file}`)]
    })
})

client.login(token)