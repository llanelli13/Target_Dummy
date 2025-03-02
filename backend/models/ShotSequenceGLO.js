const mongoose = require("mongoose");

const shotSequenceGLO = new mongoose.Schema({
  sequence_date: Date, // Date de la séquence complète
  ID_weapon: { type: mongoose.Schema.Types.ObjectId, ref: "Weapon" }, // Référence à l'arme utilisée
  name: String, // Nom de la séquence
  score: Number, // Score global de la séquence
  sequence_data: [
    {
      timing: Number, // Date spécifique du tir dans la séquence
      target_hit: String, // Cible touchée
      target: String, // Cible visée (peut être vide si non précisé)
    },
  ],
});

module.exports = mongoose.model("ShotSequenceGLO", shotSequenceGLO);
