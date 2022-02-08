import { app } from './src/app.js';
import nconf from 'nconf';

const environment = process.env.NODE_ENV || 'dev';

const environmentPath = 'config/' + environment.trim() + '.json';

nconf.file('environment', { file: environmentPath });

const port = nconf.get('port');

app.listen(port, () => {
	console.log('Server started at port ', port);
});
