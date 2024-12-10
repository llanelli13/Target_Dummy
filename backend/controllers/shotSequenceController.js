const ShotSequence = require('../models/ShotSequence');

exports.createShotSequence = async (req, res) => {
    try {
        const shotSequence = new ShotSequence(req.body);
        await shotSequence.save();
        res.status(201).json(shotSequence);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getShotSequences = async (req, res) => {
    try {
        const shotsequences = await ShotSequence.find();
        res.status(200).json(shotsequences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
