const express = require('express');
const { createTurn, getAllTurn, createUser } = require('../controllers/Turns.controller');
const VerifyTokenAuth = require('../services/authMiddleware');
const authenticationsUserJWT = require('../services/authenticationUserJWT');


const router = express.Router();

router.get('/turnos',getAllTurn);

router.post('/turnos',VerifyTokenAuth,createTurn);

router.post('/signin',authenticationsUserJWT,createUser);

//router.post('/login',logUser);

module.exports = router;