import config from './config/config.js';
import sequelize from './config/sequelize.js';

import serverExpress from'./config/express.js';
const server = serverExpress();

server.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`)
});