import Joi from 'joi';
import { env } from '../../config/config.js';

import * as apiService from '../services/api.service.js';


const idSchema = Joi.number();

const getProgram = async (req, res) => {
	const { error, value: id } = idSchema.validate(req.params.id);

	if (error) {
		res.status(400).send({error});
	}

	let program;
	try {
		program = await apiService.getProgram({urls: env.apiData, id});
	} catch (error) {
		res.status(500).send(error.message);
	}
	
	res.status(200).send(program);
};

const getPrograms = async (req, res) => {
	let programs; 
	try {
		programs = await apiService.getPrograms({urls: env.apiData});
	} catch (error) {
		res.status(500).send({error});
	}

	res.status(200).send(programs);
};

export {
	getProgram,
	getPrograms
};
  