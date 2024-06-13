const randomColor = require('randomcolor');

const generateRandomRGB = () => {
    return randomColor({
        format: 'rgb'
    });
}

const generateRandomRGBA = () => {
    return randomColor({
        format: 'rgba',
        alpha: parseFloat((Math.random()).toFixed(2))
    });
}

module.exports = {
    generateRandomRGB,
    generateRandomRGBA,
};