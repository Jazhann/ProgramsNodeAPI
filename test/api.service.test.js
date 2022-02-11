import * as apiService from '../src/services/api.service.js';
import axios from 'axios';
import apiMocks from '../mock/apimock.json';
import { jest } from '@jest/globals';


const urlsMock = [
	{ 
		url: 'http://localhost:3000/programs',
		key1: null, 
		key2: null,
		mapKey: null,  
		type: 'program' 
	},
	{ 
		url: 'http://localhost:3000/developers',
		key1: 'developer_id', 
		key2: 'id',
		mapKey: 'author_info', 
		type: 'developer' 
	}
];

describe('Error tests', () => {
	test('It should get Bad Request error', async () => {
		try {
			await apiService.getProgram({urls: urlsMock});
		} catch (error) {
			expect(error.message).toBe('Bad Request error, please check request params');
		}
	});
  
	test('It should get Server error calling getProgram', async () => {
		try {
			await apiService.getProgram({});
		} catch (error) {
			expect(error.message).toBe('Server error :(, please try again later');
		}
	});
	
	test('It should get Server error calling getPrograms', async () => {
		try {
			await apiService.getPrograms({});
		} catch (error) {
			expect(error.message).toBe('Server error :(, please try again later');
		}
	});

	test('It should get Server error calling getProgram and api not available', async () => {
		try {
			await apiService.getProgram({urls: urlsMock, id: 10});
		} catch (error) {
			expect(error.message).toBe('Server error :(, please try again later');
		}
	});

});

describe('Functionality tests', () => {

	beforeEach(() => {
		jest.spyOn(axios, 'get').mockImplementation((url) => {
			switch(url) {
			case urlsMock[0].url:
				return Promise.resolve({ data: apiMocks.programs });
			case urlsMock[1].url:
				return Promise.resolve({ data: apiMocks.developers });
			default:
				return Promise.resolve({});
			}
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('It should get no program', async () => {
		const program = await apiService.getProgram({urls: urlsMock, id: 10});
		expect(program).toEqual(undefined);
	});

	test('It should get a program', async () => {
		const response = {
			id: 62465,
			author_info: {
				name: 'Nero AG',
				url: 'http://www.nero.com/'
			},
			title: 'Nero',
			version: '10.4.3',
			url: 'http://nero.en.softonic.com',
			short_description: 'The ultimate PC multimedia suite',
			license: 'Trial',
			thumbnail: 'https://screenshots.en.sftcdn.net/en/scrn/7000/7595/thumbnail_1444824132-100x100.png',
			rating: 8,
			total_downloads: '6239531',
			compatible: [
				'Windows 8',
				'Windows 10'
			]
		};
		const program = await apiService.getProgram({urls: urlsMock, id: 62465});
		expect(program).toEqual(response);
	});

	test('It should get a programs list', async () => {
		const response = [
			{
				id: '21824',
				author_info: {
					name: 'AresGalaxy',
					url: 'https://aresgalaxy.io/'
				},
				title: 'Ares',
				version: '2.4.0',
				url: 'http://ares.en.softonic.com',
				short_description: 'Fast and unlimited P2P file sharing',
				license: 'Free (GPL)',
				thumbnail: 'https://screenshots.en.sftcdn.net/en/scrn/21000/21824/ares-14-100x100.png',
				rating: 8,
				total_downloads: '4741260',
				compatible: [
					'Windows 2000',
					'Windows XP',
					'Windows Vista',
					'Windows 7',
					'Windows 8'
				]
			},
			{
				id: 62465,
				author_info: {
					name: 'Nero AG',
					url: 'http://www.nero.com/'
				},
				title: 'Nero',
				version: '10.4.3',
				url: 'http://nero.en.softonic.com',
				short_description: 'The ultimate PC multimedia suite',
				license: 'Trial',
				thumbnail: 'https://screenshots.en.sftcdn.net/en/scrn/7000/7595/thumbnail_1444824132-100x100.png',
				rating: 8,
				total_downloads: '6239531',
				compatible: [
					'Windows 8',
					'Windows 10'
				]
			},
			{
				id: 3075333,
				author_info: {
					name: 'VideoLan',
					url: 'http://www.videolan.org/'
				},
				title: 'VLC',
				version: '2.4.0',
				url: 'http://vlc.en.softonic.com',
				short_description: 'Simply the best multi-format media player',
				license: 'Free (GPL)',
				thumbnail: 'https://screenshots.en.sftcdn.net/en/scrn/25000/25339/vlc-media-player-11-100x100.png',
				rating: 8,
				total_downloads: '5784268',
				compatible: [
					'Windows 10'
				]
			}
		];
		const program = await apiService.getPrograms({urls: urlsMock});
		expect(program).toEqual(response);
	});
});
