const db = require('quick.db')

module.exports = {
    name: 'betaal',
    description: 'Iets betalen',
    aliases: ['bet'],
    cooldown: 3,
    execute(message, args) {
        const profile = new db.table('profiles')

        const memberProfile = profile.get(`profiles_${message.author.id}`)

        if (!memberProfile) return message.channel.send("Je hebt nog geen profiel.")

        const items = []

        items.push("pistol")
        if (memberProfile.bought.pistol > 15) items.push("tech9")
        if (memberProfile.bought.tech9 > 50) items.push("ump")
        if (memberProfile.bought.ump > 150) items.push("mp5")
        if (memberProfile.bought.mp5 > 250) items.push("ak47")
        if (memberProfile.bought.ak47 > 350) items.push("carbiderifle")
        if (memberProfile.bought.carbiderifle > 450) items.push("p90")
        if (memberProfile.bought.p90 > 550) items.push("awp")
        if (memberProfile.bought.awp > 650) items.push("minigun")
        if (memberProfile.bought.minigun > 750) items.push("rpg")

        if (!items.includes(args[1]) || !args[1]) return message.channel.send(`
Je kan alleen nog dit kopen:
${items.map(i => i).join(", ")}
        `)

        var cost = profile.get(`profiles_${message.author.id}.bought.${args[1]}`) * 20 + 20 || 20

        if (!args[2]) {
            const afterBal = profile.get(`profiles_${message.author.id}.money`) - cost
            if (afterBal >= 0) {
                profile.subtract(`profiles_${message.author.id}.money`, cost)
                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, 1)
                return message.channel.send(`Je betaalt een ${args[1]} voor ${cost.toLocaleString()}`)
            } else {
                return message.channel.send("Je hebt te weinig geld.")
            }
        } else if (args[2]) {
            if (args[2] === 'max') {
                var bal = profile.get(`profiles_${message.author.id}.money`)
                const cost2 = (profile.get(`profiles_${message.author.id}.bought.${args[1]}`)) * 20 + 20 || 20

                if (cost2 > bal) return message.channel.send("Je hebt te weinig geld.")

                var oldBal = bal
                var newBal = 0
                var boughtItems = 0

                while (bal > 0) {
                    newBal = bal - cost2
                    bal = bal - cost2
                    boughtItems = boughtItems + 1
                }

                var latestPrice = profile.get(`profiles_${message.author.id}.bought.${args[1]}`) || 20
                newBal = newBal + (latestPrice * 20) + (latestPrice * 20)
                boughtItems = boughtItems - 2

                if (boughtItems === 0) return message.channel.send("Je kan alleen betalen meer dan 1 ding.")

                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, boughtItems)
                profile.set(`profiles_${message.author.id}.money`, newBal)

                return message.channel.send(`Je hebt betaald ${boughtItems.toLocaleString()} ${args[1]} voor ${(oldBal - newBal).toLocaleString()}`)
            } else if (args[2]) {
                const bal = profile.get(`profiles_${message.author.id}.money`)

                if (isNaN(args[2])) return message.channel.send(`Dat is niet een geldig getal om ${args[1]} te betalen`)

                if (args[2] <= 0) return message.channel.send(`Je kan alleen meer betalen dan 1 ${args[1]}.`)

                const extraCost = (20 * args[2]) - 20

                const newCost = (cost * args[2]) + extraCost

                if (newCost > bal) return message.channel.send("Je hebt niet genoeg geld.")

                profile.subtract(`profiles_${message.author.id}.money`, newCost)
                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, args[2])
                return message.channel.send(`Je hebt betaald ${args[2]} ${args[1]} voor ${newCost.toLocaleString()}`)
            }
        }
    }
}