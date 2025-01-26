const mongoose = require('mongoose');

const shotSequenceSchema = new mongoose.Schema({
    sequence_date: Date,
    ID_weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
    ID_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    distance: Number,
    shot_power: Number,
    location: String,
    sequence_data: [
        {
            position_x: Number, //triangulation
            position_y: Number,
            target_hit: String, //cible touchée
            target: String, //cible visé potentiel
        },
    ],
});

module.exports = mongoose.model('ShotSequence', shotSequenceSchema);
