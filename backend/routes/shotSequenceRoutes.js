const express = require('express');
const router = express.Router();
const shotSequenceController = require('../controllers/shotSequenceController');

router.post('/', shotSequenceController.createShotSequence);
router.get('/', shotSequenceController.getShotSequences);

module.exports = router;

// addShotSequence