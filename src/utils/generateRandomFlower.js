const fs = require('fs');
const path = require('path');

const { createCanvas } = require('canvas');
const { makeNoise3D } =  require("open-simplex-noise");
const { generateRandomParams } = require('./generateRandomParams');

const drawDeformedCircle = (
    ctx,
    circle,
    frequency,
    magnitude,
    seed,
    strokeColor,
    fillColor,
    noise
) => {
    ctx.beginPath();

    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;

    let samples = Math.floor(4 * circle.radius + 10);
    for (let j = 0; j < samples + 1; ++j) {
        let angle = (2 * Math.PI * j) / samples;

        let x = Math.cos(angle);
        let y = Math.sin(angle);

        let deformation = noise(x * frequency, y * frequency, seed) + 1;
        let radius = circle.radius * (1 + magnitude * deformation);

        ctx.lineTo(circle.x + radius * x, circle.y + radius * y);
    }

    ctx.closePath();

    ctx.fill();
    ctx.stroke();
};

const generateRandomFlower = async (size) => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    const {
        frequency,
        magnitude,
        independence,
        spacing,
        count,
        seed,
        strokeColor,
        fillColor
    } = generateRandomParams();

    const noise = makeNoise3D(seed);

    const circle = {
        x: size / 2,
        y: size / 2,
        radius: size / 3
    };
    circle.radius /= magnitude + 1;

    for (let i = 0; i < count; ++i) {

        drawDeformedCircle(
            ctx,
            circle,
            frequency,
            magnitude,
            seed + i * independence,
            strokeColor,
            fillColor,
            noise
        );

        circle.radius *= 1 - spacing;
    }

    const date = new Date();
    const flowerImageDir = path.join(__dirname, `../data/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);
    
    if (!fs.existsSync(flowerImageDir)) {
        fs.mkdirSync(flowerImageDir);
    }

    const flowerImagePath = path.join(flowerImageDir, `flower_${seed}.png`);
    const out = fs.createWriteStream(flowerImagePath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    return new Promise((resolve, reject) => {
        out.on('finish', () => resolve( flowerImagePath ));
        out.on('error', reject);
    });
};

module.exports = generateRandomFlower;
