const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'profiel-info',
    description: 'Bekijk de profiel info van iemand',
    aliases: ['pi'],
    cooldown: 3,
    execute(message) {
        const profiles = new db.table('profiles')

        const member = message.mentions.members.first() || message.member

        const memberProfile = profiles.get(`profiles_${member.id}`)

        if (!memberProfile) return message.channel.send("Deze persoon heeft geen profiel.")

        const a = Object.entries(memberProfile.bought).flat()
        var m = []

        for (let i = 0; i < a.length; i++) if (i & 1) m.push(a[i])

        var number = 0
        if (m[0]) number = + m[0] * 0.25
        if (m[1]) number = + m[1] * 0.5
        if (m[2]) number = + m[2] * 1
        if (m[3]) number = + m[3] * 2
        if (m[4]) number = + m[4] * 4
        if (m[5]) number = + m[5] * 8
        if (m[6]) number = + m[6] * 12
        if (m[7]) number = + m[7] * 16
        if (m[8]) number = + m[8] * 20
        if (m[9]) number = + m[9] * 24

        return message.channel.send(new MessageEmbed()
            .setColor("BLUE")
            .setThumbnail(member.user.displayAvatarURL())
            .setTitle(`${member.user.username}'s profiel`)
            .addFields(
                { name: "Geld", value: memberProfile.money.toLocaleString() },
                { name: "Totaal geld", value: memberProfile.totalmoney.toLocaleString() },
                { name: "Geld per 10/sec", value: number.toLocaleString() }
            )
        )
    }
}