const ShotSequence = require('../models/ShotSequence');

// Create a sequence
exports.createShotSequence = async (req, res) => {
    try {
        const { sequence_date, ID_weapon, ID_user, distance, shot_power, location } = req.body;

        const shotSequence = new ShotSequence({
            sequence_date,
            ID_weapon, // ObjectId de l'arme (référence à la collection Weapon)
            ID_user,   // ObjectId de l'utilisateur (référence à la collection User)
            distance,
            shot_power,
            location,
        });

        await shotSequence.save();
        res.status(201).json(shotSequence);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all sequences
exports.getShotSequences = async (req, res) => {
    try {
        const shotSequences = await ShotSequence.find().populate('ID_weapon ID_user');
        res.status(200).json(shotSequences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get sequence by ID
exports.getShotSequenceById = async (req, res) => {
    try {
        const shotSequence = await ShotSequence.findById(req.params.id).populate('ID_weapon ID_user');
        if (!shotSequence) {
            return res.status(404).json({ error: 'ShotSequence not found' });
        }
        res.status(200).json(shotSequence);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user's history
exports.getHistory = async (req, res) => {
    try {
        const shotSequences = await ShotSequence.find({ ID_user: req.params.userId }).populate('ID_weapon');
        res.status(200).json(shotSequences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modify a sequence
exports.modifyShotSequence = async (req, res) => {
    try {
        const updates = req.body;
        const shotSequence = await ShotSequence.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('ID_weapon ID_user');
        if (!shotSequence) {
            return res.status(404).json({ error: 'ShotSequence not found' });
        }
        res.status(200).json(shotSequence);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a sequence
exports.deleteShotSequence = async (req, res) => {
    try {
        const shotSequence = await ShotSequence.findByIdAndDelete(req.params.id);
        if (!shotSequence) {
            return res.status(404).json({ error: 'ShotSequence not found' });
        }
        res.status(200).json({ message: 'ShotSequence deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
