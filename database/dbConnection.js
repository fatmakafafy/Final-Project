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
    mongoose.connect('mongodb+srv://fatmamostafakafafy:q2Cp4m5Vu4Xa3TWw@cluster0.rhp0umi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
                console.log("Database Connected")
            }).catch((err) => {
                console.log("Error", err)
            })
};