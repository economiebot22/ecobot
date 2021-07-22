const db = require("quick.db");

module.exports = (client) => {
  console.log("Active!!");

  setInterval(() => {
    const profiles = new db.table("profiles");

	if (!profiles.all()) return

    profiles.all().forEach(({ data, ID }) => {
      const memberID = ID.split("_")[1];

      if (!data.bought) return

      const a = Object.entries(data.bought).flat();

      let m = [];

      for (let i = 0; i < a.length; i++) if (!(i & 1)) m.push(a[i]);

      m.forEach((item) => {
        const itemCount = data.bought[item];

        var number;
        if (item === "pistol") number = 0.25;
        if (item === "tech9") number = 0.5;
        if (item === "ump") number = 1;
        if (item === "mp5") number = 2;
        if (item === "ak47") number = 4;
        if (item === "carbiderifle") number = 8;
        if (item === "p90") number = 12;
        if (item === "awp") number = 16;
        if (item === "minigun") number = 20;
        if (item === "rpg") number = 24;

        const addAmount = itemCount * number;

        profiles.add(`profiles_${memberID}.money`, addAmount);
        profiles.add(`profiles_${memberID}.totalmoney`, addAmount)
      });
    });
  }, 10000);
};