const mongoose = require('mongoose');

const shotSequenceSchema = new mongoose.Schema({
    ID_sequence: String,
    sequence_date: Date,
    ID_weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
    ID_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    distance: Number,
    shot_power: Number,
    location: String,
});

module.exports = mongoose.model('ShotSequence', shotSequenceSchema);
