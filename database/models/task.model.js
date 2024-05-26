import mongoose from "mongoose";

const taskSchema= mongoose.Schema({
    title:String,
    description:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})

export const taskModel= mongoose.model('task',taskSchema)