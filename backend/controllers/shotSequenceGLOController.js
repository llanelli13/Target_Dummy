const ShotSequenceGLO = require("../models/ShotSequenceGLO");

// Create a sequence
exports.createShotSequence = async (req, res) => {
  try {
    const newSequence = new ShotSequenceGLO(req.body);
    await newSequence.save();
    res.status(201).json(newSequence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sequences
exports.getAllSequences = async (req, res) => {
  try {
    const sequences = await ShotSequenceGLO.find().populate("ID_weapon");
    res.status(200).json(sequences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sequences sorted by score (descending)
exports.getSequencesSortedByScore = async (req, res) => {
  try {
    const sequences = await ShotSequenceGLO.find()
      .populate("ID_weapon")
      .sort({ score: -1 }); // Tri décroissant
    res.status(200).json(sequences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sequence by ID
exports.getSequenceById = async (req, res) => {
  try {
    const sequence = await ShotSequenceGLO.findById(req.params.id).populate(
      "ID_weapon"
    );
    if (!sequence) {
      return res.status(404).json({ error: "Sequence not found" });
    }
    res.status(200).json(sequence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sequences by weapon ID
exports.getSequencesByWeaponId = async (req, res) => {
  try {
    const sequences = await ShotSequenceGLO.find({
      ID_weapon: req.params.weaponId,
    }).populate("ID_weapon");
    res.status(200).json(sequences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modify a sequence
exports.modifySequence = async (req, res) => {
  try {
    const updatedSequence = await ShotSequenceGLO.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retourner la nouvelle version mise à jour
    ).populate("ID_weapon");

    if (!updatedSequence) {
      return res.status(404).json({ error: "Sequence not found" });
    }

    res.status(200).json(updatedSequence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a sequence
exports.deleteSequence = async (req, res) => {
  try {
    const deletedSequence = await ShotSequenceGLO.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSequence) {
      return res.status(404).json({ error: "Sequence not found" });
    }
    res.status(200).json({ message: "Sequence deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
