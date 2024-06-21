//controller  
import { HeartRateModel } from '../../../database/models/notification.model.js';
import axios from 'axios';

const addHeartRateReading = async (req, res) => {
    try {
        const { heartRate, SpO2 } = req.body;
        console.log(`Received data - HeartRate: ${heartRate}, SpO2: ${SpO2}`);
        const newReading = await HeartRateModel.create({ heartRate, SpO2 });
        console.log('New reading added to the database');

        if (heartRate < 60 || heartRate > 100) {
            console.log(`Alert: Heart rate is ${heartRate}`);
        }

        res.status(201).json({ message: "Success", data: newReading });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error('Error adding heart rate reading:', err);
    }
};

async function fetchLatestReading() {
    try {
        console.log('Fetching latest reading from the database');
        const latestReading = await HeartRateModel.findOne().sort({ createdAt: -1 });
        if (!latestReading) {
            console.log('No readings found in the database');
        } else {
            console.log(`Latest reading - HeartRate: ${latestReading.heartRate}, SpO2: ${latestReading.SpO2}`);
        }
        return latestReading;
    } catch (err) {
        console.error('Error fetching latest reading:', err);
        return null;
    }
}

async function checkSensorDataAndNotify() {
    try {
        console.log('Checking sensor data');
        const latestReading = await fetchLatestReading();

        if (!latestReading) {
            console.log('No readings found in the database.');
            return { success: false, message: 'No readings found' };
        }

        const { heartRate, SpO2 } = latestReading;

        console.log(`Current reading - Heart Rate: ${heartRate}, SpO2: ${SpO2}`);

        if (heartRate < 60 || heartRate > 100) {
            console.log(`Sending notification for heart rate: ${heartRate}`);
            await axios.post('http://localhost:4000/send-notification', {
                heartRate,
                message: `Heart rate is ${heartRate}.`
            });
            console.log(`Alert: Heart rate is ${heartRate}`);
        }

        return { success: true, data: latestReading };
    } catch (err) {
        console.error('Error checking sensor data and notifying:', err);
        return { success: false, message: 'Internal server error' };
    }
}

// Express route handler
const checkSensorDataAndNotifyHandler = async (req, res) => {
    console.log('Received request to check sensor data and notify');
    const result = await checkSensorDataAndNotify();
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
    console.log('Response sent for check sensor data and notify');
}

export { checkSensorDataAndNotify, addHeartRateReading, checkSensorDataAndNotifyHandler };