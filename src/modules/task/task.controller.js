import { taskModel } from "../../../database/models/task.model.js"

const addTask = async (req, res) => {
    const { title, description} = req.body
    await taskModel.insertMany({ title, description, createdBy:req.userId })
    res.json({ message: "Success" })   
}

const getAllTasks = async (req, res) => {
    let tasks = await taskModel.find().populate('createdBy', 'name -_id')
    res.json({ message: "Success", tasks })
}
const getUserTasks = async (req, res) => {
    const { id } = req.params
    let tasks = await taskModel.find({ createdBy: id }).populate('createdBy', 'name -_id')
    res.json({ message: "Success", tasks })
}

const updateTask = async (req, res) => {
    const { title, description, _id } = req.body
    let task = await taskModel.findByIdAndUpdate({ _id }, { title, description }, { new: true })
    if (task) {
        res.json({ message: "Success", task })
    } else {
        res.json({ message: "not found" })
    }
}

const deleteTask = async (req, res) => {
    const { _id } = req.body
    let task = await taskModel.findByIdAndDelete({ _id })
    if (task) {
        res.json({ message: "Success", task })
    } else {
        res.json({ message: "Not found" })
    }
}

export {
    addTask,
    getAllTasks,
    getUserTasks,
    updateTask,
    deleteTask
}

