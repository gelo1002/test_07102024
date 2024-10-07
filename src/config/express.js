import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config.js';
import router from './routes.js';
import errors from '../middlewares/error.middleware.js';
import '../utils/auth/index.js';

function serverExpress() {
    const app = express();

    app.use(cors());
    // require('../src/utils/auth'); // TODO: complements passport
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(`${config.version}/public`, express.static('public'));
    router(app);
    
    app.use(errors.logErrors);
    app.use(errors.ormErrorHandler)
    app.use(errors.boomErrorHandler);
    app.use(errors.errorHandler);

    return app;
}
export default serverExpress;