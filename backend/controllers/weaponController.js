const Weapon = require('../models/Weapon');

exports.createWeapon = async (req, res) => {
    try {
        const weapon = new Weapon(req.body);
        await weapon.save();
        res.status(201).json(weapon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWeapons = async (req, res) => {
    try {
        const weapons = await Weapon.find();
        res.status(200).json(weapons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
