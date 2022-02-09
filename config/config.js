import nconf from 'nconf';

const environment = process.env.NODE_ENV || 'dev';

const environmentPath = 'config/' + environment.trim() + '.json';

nconf.file('environment', { file: environmentPath });

const env = nconf.get();

export {
	env
};