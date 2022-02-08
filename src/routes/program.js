import express from 'express';
import * as ProgramController from '../controllers/program.js';

const programRoutes = express.Router();
programRoutes.get('/getProgram/:id', ProgramController.getProgram);
programRoutes.get('/getProgram', ProgramController.getPrograms);

export { programRoutes };
