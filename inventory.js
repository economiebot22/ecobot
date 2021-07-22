const db = require("quick.db");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "voorraad",
    description: "Kijken hoeveel spullen je hebt",
    aliases: ["v"],
    cooldown: 3,
    execute(message) {
        const profiles = new db.table("profiles");

        const user = message.mentions.users.first() || message.author;

        const userProfile = profiles.get(`profiles_${user.id}`);

        if (!userProfile)
            return message.channel.send("Deze persoon heeft geen profiel.");

        const bought = profiles.get(`profiles_${user.id}.bought`);

        try {
            const items = Object.entries(bought).map(([key, value]) => {
                return `${capitalise(key)} - ${value}`;
            });

            return message.channel.send(
                new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`${user.username}'s voorraad`)
                .setDescription(items.join("\n").toLocaleString())
            );
        } catch {
            return message.channel.send("Je hebt geen spullen.");
        }
    },
};

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}