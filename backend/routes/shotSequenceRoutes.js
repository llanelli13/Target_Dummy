const express = require('express');
const router = express.Router();
const shotSequenceController = require('../controllers/shotSequenceController');

router.post('/', shotSequenceController.createShotSequence);
router.get('/', shotSequenceController.getShotSequences);

router.get('/user/:userId', shotSequenceController.getHistory); // Historique d'un utilisateur
router.get('/:id', shotSequenceController.getShotSequenceById); // Récupérer une séquence par ID
router.put('/:id', shotSequenceController.modifyShotSequence); // Modifier une séquence
router.delete('/:id', shotSequenceController.deleteShotSequence); // Supprimer une séquence

module.exports = router;

