const express = require('express');
const router = express.Router();

const cardsRouter = require('./cardRoutes');

router.use('/cards', cardsRouter);

module.exports = router;
