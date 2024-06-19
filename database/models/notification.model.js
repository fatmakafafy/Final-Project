import mongoose from 'mongoose';

const heartRateSchema = new mongoose.Schema({
    heartRate: Number,
    SpO2: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const HeartRateModel = mongoose.model('HeartRate', heartRateSchema);

export { HeartRateModel };
