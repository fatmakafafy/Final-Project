// import mongoose from "mongoose";

// const userSchema= mongoose.Schema({
//     name:String,
//     email:String,
//     password:String,
//     role:{
//         type:String,
//         enum:['admin','user'],
//         default:'user'
//     }
// },{
//     timestamps:true
// })

// export const userModel=mongoose.model('user',userSchema)




import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true
});


export const userModel = mongoose.model('user', userSchema);
