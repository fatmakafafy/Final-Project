import express from 'express';
import { addHeartRateReading, checkSensorDataAndNotify } from './notification.controller.js';

const router = express.Router();

// Define the route to check sensor data and notify
router.get('/check-heart-rate', checkSensorDataAndNotify);
router.post('/heart-rate', addHeartRateReading);

export default router;