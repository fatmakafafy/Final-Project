import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.post('/send-notification', (req, res) => {
    const { heartRate, message } = req.body;

    console.log(`Notification received: Heart Rate: ${heartRate}, Message: ${message}`);

    res.status(200).json({ success: true, message: 'Notification received' });
});


app.listen(PORT, () => {
    console.log(`Notification server is running on http://localhost:${PORT}`);
});
