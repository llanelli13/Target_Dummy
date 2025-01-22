const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
    name_weapon: String,
    weapon_type: String,
    weapon_caliber: String,
    weapon_power: Number,
    weapon_weight: Number,
    description: String,
    image: String,
});

module.exports = mongoose.model('Weapon', weaponSchema);
