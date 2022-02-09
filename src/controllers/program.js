import Joi from 'joi';
import { env } from '../../config/config.js';

import * as apiService from '../services/api.service.js';


const idSchema = Joi.number();

const getProgram = async (req, res) => {
	const { error, value } = idSchema.validate(req.params.id);

	if (error) {
		res.status(400).send({ message: error});
	}

	const program = await apiService.getProgram({urls: env.apiData, id: value});
	res.status(200).send(program);


};

const getPrograms = async (req, res) => {
	const programs = await apiService.getPrograms({urls: env.apiData});
	res.status(200).send(programs);
};

export {
	getProgram,
	getPrograms
};
  