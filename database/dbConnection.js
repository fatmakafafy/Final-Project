// import mongoose from "mongoose";

// export function dbConnection() {
//     mongoose.connect(process.env.DB_CONNECTION).then(() => {
//         console.log(process.env.DB_CONNECTION);
//         console.log("Database Connected")
//     }).catch((err) => {
//         console.log("Error", err)
//     })
// }  
// import mongoose from "mongoose";
// export function dbConnection() {
//     // mongoose.connect('mongodb://localhost:27017/testing', {
//     mongoose.connect('mongodb+srv://adamosama9080:aeuanWf7D5l2GgBU@final-project.gi2khfa.mongodb.net/?retryWrites=true&w=majority&appName=final-project', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(() => {
//         console.log("Database Connected")
//     }).catch((err) => {
//         console.log("Error", err)
//     })
// };

import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected');
    }).catch((error) => {
        console.error('Database connection error:', error);
    });
};
