import axios from 'axios';
import { ProgramDTO } from '../DTOs/program.js';

const getProgram = async (params) => {
	const {id, urls} = params;
	if (!Array.isArray(urls) || !urls.length) {
		console.error();
	}
	let programs;
	try {
		programs = await getPrograms({urls});
	} catch (error) {
		throw new Error(error.message);
	}
	return programs.find(el => el.id === id);
};

const getPrograms = async (params) => {
	const urls = params.urls;
	const dataFetched = [];
	if (!Array.isArray(urls) || !urls.length) {
		console.error();
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
			throw new Error(error.message);
		}
	}

	return dataFetched.length ? mapData(dataFetched) : dataFetched;

};

const mapData = (dataToMap) => {
	const programData  = dataToMap.find(el => el.type = 'program').data;
	const programs = [];
	for (let p of programData) {
		const program = new ProgramDTO(p);
		for (let d of dataToMap) {
			if (d.type !== 'program') {
				const data = d.data.find(e => e[d.key2] == p[d.key1]);
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