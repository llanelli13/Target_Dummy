const Weapon = require('../models/Weapon');

// Create a weapon
exports.createWeapon = async (req, res) => {
    try {
        const weapon = new Weapon(req.body);
        await weapon.save();
        res.status(201).json(weapon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all weapon
exports.getWeapons = async (req, res) => {
    try {
        const weapons = await Weapon.find();
        res.status(200).json(weapons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get weapon by id
exports.getOneWeapon = async (req, res) => {
    try {
        const weapon = await Weapon.findById(req.params.id);
        if (!weapon) {
            return res.status(404).json({ error: 'Weapon not found' });
        }
        res.status(200).json(weapon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
