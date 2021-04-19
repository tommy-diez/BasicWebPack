const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cities.controllers');

router.get('/', cityController.findAll);

router.post('/', cityController.create);

router.get('/:id', cityController.findById);

router.put('/:id', cityController.update);

router.delete('/:id', cityController.delete);

module.exports = router;