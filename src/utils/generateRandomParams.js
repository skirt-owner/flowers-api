const logger = require('./logger');
const {
    generateRandomRGB, generateRandomRGBA
} = require('./generateRandomColor')

const generateRandomParams = () => {
    const params = {
        frequency: parseFloat((Math.random() * 10).toFixed(2)),
        magnitude: parseFloat(Math.random().toFixed(3)),
        independence: parseFloat(Math.random().toFixed(3)),
        spacing: parseFloat((Math.random() * 0.5).toFixed(4)),
        count: Math.floor(Math.random() * 200 + 1),
        seed: Math.floor(Math.random() * (10**12 - 10**10) + 10**10),
        strokeColor: generateRandomRGB(),
        fillColor: generateRandomRGBA()
    };

    logger.info(params);

    return params;
};

module.exports = {
    generateRandomParams,
};