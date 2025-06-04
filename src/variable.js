const today = new Date();

const rdn = new Math.seedrandom(today.getHours());

const rdn_bonus = (rdn() * 0.001)
console.log(rdn_bonus)

// const random = parseFloat((Math.random() * 0.0004 - 0.0001).toFixed(7));