import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { HeartRateModel } from './database/models/notification.model.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.DB_CONNECTION;

const ranges = [
    [60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80], // rangeNormal
    [81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],  // rangeSad
    [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120],  // rangeHappy
    [121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140]  // rangeAngry
];

let currentRangeIndex = 0;
const RANGE_SWITCH_INTERVAL_MS = 2 * 60 * 1000; 

function getRandomValueFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function generateHeartRate() {
    return getRandomValueFromArray(ranges[currentRangeIndex]);
}

function generateSpO2() {
    return Math.floor(Math.random() * (100 - 90 + 1)) + 90;
}

async function createHeartRateEntry() {
    const heartRate = generateHeartRate();
    const SpO2 = generateSpO2();

    const newEntry = new HeartRateModel({
        heartRate,
        SpO2
    });

    try {
        await newEntry.save();
        console.log(`New entry created: ${JSON.stringify(newEntry)}`);
    } catch (err) {
        console.error('Error creating new entry:', err.message);
    }
}

setInterval(() => {
    currentRangeIndex = (currentRangeIndex + 1) % ranges.length;
    console.log(`Switched to range index: ${currentRangeIndex}`);
}, RANGE_SWITCH_INTERVAL_MS);

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, 
    socketTimeoutMS: 45000 
};

mongoose.connect(mongoUri, mongooseOptions)
    .then(() => {
        console.log('Connected to MongoDB');
        setInterval(createHeartRateEntry, 3000);
    })
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
    });
    
app.get('/heartRate',async(req, res) => {
    try{
        const heartRate = await HeartRateModel.find().sort({ createdAt: -1 });
        res.status(200).json({ heartRate });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
