const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "winkel",
    description: "Bekijk de lijst met alle dingen die je kan kopen",
    aliases: ["w"],
    cooldown: 3,
    execute(message) {
        const p = new db.table("profiles")

        const member = message.member.id

        const pistol = p.get(`profiles_${member}.bought.pistol`)
        const tech9 = p.get(`profiles_${member}.bought.tech9`)
        const ump = p.get(`profiles_${member}.bought.ump`)
        const mp5 = p.get(`profiles_${member}.bought.mp5`)
        const ak47 = p.get(`profiles_${member}.bought.ak47`)
        const carbiderifle = p.get(`profiles_${member}.bought.carbiderifle`)
        const p90 = p.get(`profiles_${member}.bought.p90`)
        const awp = p.get(`profiles_${member}.bought.awp`)
        const minigun = p.get(`profiles_${member}.bought.minigun`)
        const rpg = p.get(`profiles_${member}.bought.rpg`)
        const shotgun = p.get(`profiles_${member}.bought.shotgun`)
        const sniper = p.get(`profiles_${member}.bought.sniper`)
        const bazooka = p.get(`profiles_${member}.bought.bazooka`)

        return message.channel.send(new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`
Pistol - €${(pistol * 20 + 20 || "20").toLocaleString()} - €0.25 /10s
${pistol > 15 ? `Tech9 - €${(tech9 * 20 + 20 || "20").toLocaleString()} - €0.5 /10s` : ""}
${tech9 > 50 ? `UMP - €${(ump * 20 + 20 || "20").toLocaleString()} - €1 /10s` : ""}
${ump > 150 ? `MP5 - €${(mp5 * 20 + 20 || "20").toLocaleString()} - €2 /10s` : ""}
${mp5 > 250 ? `AK47 - €${(ak47 * 20 + 20 || "20").toLocaleString()} - €4 /10s` : ""}
${ak47 > 350 ? `Carbide Rifle €${(carbiderifle * 20 + 20 || "20").toLocaleString()} - €8 /10s` : ""}
${carbiderifle > 450 ? `P90 €${(p90 * 20 + 20 || "20").toLocaleString()} - €12 /10s` : ""}
${p90 > 550 ? `AWP - €${(awp * 20 + 20 || "20").toLocaleString()} - €16 /10s` : ""}
${awp > 650 ? `MiniGun - €${(minigun * 20 + 20 || "20").toLocaleString()} - €20 /10s` : ""}
${minigun > 750 ? `RPG - €${(rpg * 20 + 20 || "20").toLocaleString()} - €24 /10s` : ""} 
${rpg > 850 ? `shotgun - €${(shotgun * 20 + 20 || "20").toLocaleString()} - €28 /10s` : ""}
${shotgun > 950 ? `sniper - €${(sniper * 20 + 20 || "20").toLocaleString()} - €32 /10s` : ""}
${sniper > 1050 ? `bazooka - €${(bazooka * 20 + 20 || "20").toLocaleString()} - €36 /10s` : ""}        
         `)
        )
    }
}