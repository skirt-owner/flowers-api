const express = require('express');

const morganMiddleware = require('./middlewares/morgan.middleware');
const crossDomainMiddleware = require('./middlewares/crossDomain.middleware');

const {
    handleRouteNotFoundError, handleIncorrectPath, mainRoute
} = require('./controllers/flowerControllers');

const router = require('./routes/flowerRoutes');
const logger = require('./utils/logger');

const app = express();

const serverPort = process.env.PORT || 4201;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(crossDomainMiddleware);
app.use(morganMiddleware);

app.use('/api', router);

app.use('/', mainRoute);

app.get('/error', handleRouteNotFoundError);

app.use('*', handleIncorrectPath);

app.listen(serverPort, () => {
    logger.info(`Server is running on port ${serverPort}`);
});
