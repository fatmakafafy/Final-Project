import {HeartRateModel } from '../../../database/models/notification.model.js';

// // const addNotification = async (req, res) => {
// //     try {
// //         const { heartRate, SpO2 } = req.body;
// //         await HeartRateModel.create({ heartRate, SpO2 });

// //         if (heartRate < 60 || heartRate > 100) {
// //             console.log(`alert: heartRate is ${heartRate}`);
// //         }

// //         res.status(200).json({ message: "Success", heartRate, SpO2 });
// //     } catch (err) {
// //         res.status(500).json({ message: err.message });
// //         console.log(err);
// //     }
// // };

import axios from 'axios';

// Function to fetch the latest reading from MongoDB
    async function fetchLatestReading() {
        try {
            const latestReading = await HeartRateModel.findOne().sort({ createdAt:-1 });
            return latestReading;
        } catch (err) {
            console.error('Error fetching latest reading:', err);
            return null;
        }
    }
    

// Function to send notifications based on fetched data
async function checkSensorDataAndNotify() {
    try {
        const latestReading = await fetchLatestReading();

        if (!latestReading) {
            console.log('No readings found in the database.');
            return;
        }

        const { heartRate, SpO2 } = latestReading;

        console.log(`Current reading - Heart Rate: ${heartRate}, SpO2: ${SpO2}`);
        //70

        if (heartRate < 60 || heartRate > 100) {
            // Send notification to the Flutter notification server
            await axios.post('http://localhost:4000/send-notification', {
                heartRate,//50
                message: `Heart rate is ${heartRate}.`
            });
            console.log(`Alert: Heart rate is ${heartRate}`);
        }
    } catch (err) {
        console.error('Error checking sensor data and notifying:', err);
    }
}
const addHeartRateReading = async (req, res) => {
    try {
        const { heartRate, SpO2 } = req.body;
        const newReading = await HeartRateModel.create({ heartRate, SpO2 });

        if (heartRate < 60 || heartRate > 100) {
            console.log(`Alert: Heart rate is ${heartRate}`);
        }

        res.status(201).json({ message: "Success", data: newReading });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error('Error adding heart rate reading:', err);
    }
};


export { addHeartRateReading,checkSensorDataAndNotify };