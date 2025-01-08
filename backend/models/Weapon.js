const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
    ID_weapon: String,
    name_weapon: String,
    weapon_type: String,
    weapon_caliber: String,
    weapon_power: Number,
    weapon_weight: Number,
    description: String,
});

module.exports = mongoose.model('Weapon', weaponSchema);
