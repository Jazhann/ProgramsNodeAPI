import { app } from './src/app.js';
import { env } from './config/config.js';

app.listen(env.port, () => {
	console.log('Server started at port ', env.port);
});
