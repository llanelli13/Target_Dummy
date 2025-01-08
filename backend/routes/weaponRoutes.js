const express = require('express');
const router = express.Router();
const weaponController = require('../controllers/weaponController');

router.post('/', weaponController.createWeapon);
router.get('/', weaponController.getWeapons);

module.exports = router;
