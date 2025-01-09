const express = require('express');
const router = express.Router();
const weaponController = require('../controllers/weaponController');

router.post('/', weaponController.createWeapon); // Créer une arme
router.get('/', weaponController.getWeapons); // Récupérer toutes les armes

router.get('/:id', weaponController.getOneWeapon); // Récupérer une arme spécifique

module.exports = router;
