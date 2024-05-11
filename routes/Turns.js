const express = require('express');
const { createTurn, getAllTurn, createUser } = require('../controllers/Turns.controller');

const router = express.Router();

router.get('/turnos',getAllTurn);

router.post('/turnos',createTurn);

router.post('/login',createUser);

module.exports = router;