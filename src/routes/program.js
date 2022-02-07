const express = require('express');
const ProgramController = require('../controllers/program');

const api = express.Router();


api.get('/getProgram/:id', ProgramController.getProgram);

api.get('/getProgram', ProgramController.getPrograms);


module.exports = api;