
//rrouter
import express from 'express';
import { checkSensorDataAndNotifyHandler, addHeartRateReading } from './notification.controller.js';

const router = express.Router();

// Define the route to check sensor data and notify
router.get('/check-heart-rate', checkSensorDataAndNotifyHandler);
router.post('/heart-rate', addHeartRateReading);

export default router;