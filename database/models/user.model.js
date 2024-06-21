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
    _id:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
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
