const express = require('express');
const router = express.Router();
const weaponController = require('../controllers/weaponController');

router.post('/', weaponController.createWeapon); // Create weapon
router.get('/', weaponController.getWeapons); // Get all weapons
router.get('/:id', weaponController.getOneWeapon); // Get weapon by ID

module.exports = router;
