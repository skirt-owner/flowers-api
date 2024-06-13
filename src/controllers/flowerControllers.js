const logger = require('../utils/logger');
const generateRandomFlower = require('../utils/generateRandomFlower');

const getStatus = async (req, res) => {
    res.status(200).json({
        status: 'Flower API is up and running'
    });
};

const getFlower = async (req, res) => {
    try {
        const { size } = req.query;

        if (!size) {
            logger.warn('Flower size was not specified');
            return res.status(404).json({
                error: 'Flower size was not specified'
            });
        }

        const flowerPath = await generateRandomFlower(parseInt(size));

        res.status(200).sendFile(flowerPath);
    } catch (error) {
        logger.error(`Failed to generate a flower: ${error.message}`);
        res.status(500).json({ error: 'Failed to generate a flower' });
    }
};

const handleRouteNotFoundError = (req, res) => {
    res.status(404).json({ error: 'Requested resource not found' });
};

const handleIncorrectPath = async (req, res) => {
    res.redirect('/error');
};

const mainRoute = async (req, res) => {
    res.redirect('/status');
};

module.exports = {
    getStatus,
    getFlower,
    handleRouteNotFoundError,
    handleIncorrectPath,
    mainRoute,
};
  
  
  