

import mongoose from 'mongoose';

const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [80, 'Name must be at most 80 characters long']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be less than 0']
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required'],
        min: [0, 'Weight cannot be less than 0']
    },
    height: {
        type: Number,
        required: [true, 'Height is required'],
        min: [0, 'Height cannot be less than 0']
    },
    SpO2: {
        type: Number,
        required: [true, 'SpO2 is required'],
        min: [0, 'SpO2 cannot be less than 0'],
        max: [100, 'SpO2 cannot be more than 100']
    },
    heartRate: {
        type: Number,
        required: [true, 'Heart Rate is required'],
        min: [0, 'Heart Rate cannot be less than 0']
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ChildModel = mongoose.model('Child', childSchema);

export { ChildModel };