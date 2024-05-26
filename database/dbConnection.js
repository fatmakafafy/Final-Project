// import mongoose from "mongoose";

// export function dbConnection() {
//     mongoose.connect(process.env.DB_CONNECTION).then(() => {
//         console.log(process.env.DB_CONNECTION);
//         console.log("Database Connected")
//     }).catch((err) => {
//         console.log("Error", err)
//     })
// }  
import mongoose from "mongoose";
export function dbConnection() {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
};