import Joi from 'joi';
import { env } from '../../config/config.js';
import { CONSTANTS  } from '../shared/constants.js';
import * as apiService from '../services/api.service.js';
import { logger } from '../services/looger.service.js';


const idSchema = Joi.number();

/**
 * Get a program by id
 * @param {*} req request
 * @param {*} res response
 */
const getProgram = async (req, res) => {
	const { error, value: id } = idSchema.validate(req.params.id);

	if (error) {
		logger.error('ProgramController.getProgram ' + error);
		return res.status(400).send(CONSTANTS.BAD_REQUEST_ERROR);
	}

	let program;
	try {
		program = await apiService.getProgram({urls: env.apiData, id});
	} catch (error) {
		logger.error('ProgramController.getProgram ' + error);
		return res.status(500).send(error.message);
	}
	
	return res.status(program ? 200 : 204).send(program);
};

/**
 * Get list of programs
 * @param {*} req request
 * @param {*} res response
 */
const getPrograms = async (req, res) => {
	let programs; 
	try {
		programs = await apiService.getPrograms({urls: env.apiData});
	} catch (error) {
		logger.error('ProgramController.getPrograms ' + error);
		return res.status(500).send(error.message);
	}

	return res.status(programs.length ? 200 : 204).send(programs);
};

export {
	getProgram,
	getPrograms
};
  