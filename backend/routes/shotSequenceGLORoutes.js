const express = require("express");
const router = express.Router();
const shotSequenceGLOController = require("../controllers/shotSequenceGLOController");

// Créer une nouvelle séquence de tir
router.post("/", shotSequenceGLOController.createShotSequence);

// Récupérer toutes les séquences
router.get("/", shotSequenceGLOController.getAllSequences);

// Récupérer toutes les séquences triées par score décroissant
router.get("/sorted", shotSequenceGLOController.getSequencesSortedByScore);

// Récupérer une séquence spécifique par son ID
router.get("/:id", shotSequenceGLOController.getSequenceById);

// Récupérer toutes les séquences d'une arme spécifique par son ID
router.get(
  "/weapon/:weaponId",
  shotSequenceGLOController.getSequencesByWeaponId
);

// Modifier une séquence par son ID
router.put("/:id", shotSequenceGLOController.modifySequence);

// Supprimer une séquence par son ID
router.delete("/:id", shotSequenceGLOController.deleteSequence);

module.exports = router;
