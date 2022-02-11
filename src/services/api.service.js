import axios from 'axios';
import { ProgramDTO } from '../DTOs/program.js';
import { CONSTANTS } from '../shared/constants.js';

/**
 * Get a program 
 * @param {*} params Object {url: api urls from config file, id: program id to find}
 * @returns ProgramDTO
 */
const getProgram = async (params) => {
	const {id, urls} = params;
	if (!Array.isArray(urls) || !urls.length) {
		throw new Error(CONSTANTS.SERVER_ERROR);
	}

	if (isNaN(id)) {
		throw new Error(CONSTANTS.BAD_REQUEST_ERROR);
	}

	let programs;
	try {
		programs = await getPrograms({urls});
	} catch (error) {
		throw new Error(error.message);
	}

	return programs.find(el => el.id == id);
};

/**
 * Get programs
 * @param {*} params Object {url: api urls from config file}
 * @returns ProgramDTO array
 */
const getPrograms = async (params) => {
	const urls = params.urls;
	const dataFetched = [];
	if (!Array.isArray(urls) || !urls.length) {
		throw new Error(CONSTANTS.SERVER_ERROR);
	}

	for (let urlData of urls) {
		const {url, ...mapData} = urlData;

		try {
			const data = await axios.get(url);
			dataFetched.push({
				data: data.data,
				...mapData
			});
		} catch (error) {
			throw new Error(CONSTANTS.SERVER_ERROR);
		}
	}

	return dataFetched.length ? mapData(dataFetched) : dataFetched;

};

/**
 * Map data into a single object
 * @param {*} dataToMap 
 * @returns ProgramDTO
 */
const mapData = (dataToMap) => {
	const programData  = dataToMap.find(el => el.type = CONSTANTS.PROGRAM_TYPE).data;
	const programs = [];
	for (let p of programData) {
		const program = new ProgramDTO(p);
		for (let d of dataToMap) {
			if (d.type !== CONSTANTS.PROGRAM_TYPE) {
				const data = {...d.data.find(e => e[d.key2] == p[d.key1])};
				delete data[d.key2];
				program.map(d.mapKey, data);
				programs.push(program);
			}
		}
		
	}
	return programs;
};

export { 
	getProgram,
	getPrograms 
};