const express = require('express');
const router = express.Router();
const { cardController } = require('../controllers');

router.get('/', cardController.getAllCards);
router.post('/', cardController.createCard);

module.exports = router;
