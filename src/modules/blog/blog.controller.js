import { blogModel } from "../../../database/models/blog.model.js"

const addBlog = async (req, res) => {
    const { title, description} = req.body
    await blogModel.insertMany({ title, description, createdBy:req.userId })
    res.json({ message: "Success" })   
}

const getAllBlogs = async (req, res) => {
    let blogs = await blogModel.find().populate('createdBy', 'name -_id')
    res.json({ message: "Success", blogs })
}
const getUserBlogs = async (req, res) => {
    const { id } = req.params
    let blogs = await blogModel.find({ createdBy: id }).populate('createdBy', 'name -_id')
    res.json({ message: "Success", blogs })
}

const updateBlog = async (req, res) => {
    const { title, description, _id } = req.body
    let blog = await blogModel.findByIdAndUpdate({ _id }, { title, description }, { new: true })
    if (blog) {
        res.json({ message: "Success", blog })
    } else {
        res.json({ message: "not found" })
    }
}

const deleteBlog = async (req, res) => {
    const { _id } = req.body
    let blog = await blogModel.findByIdAndDelete({ _id })
    if (blog) {
        res.json({ message: "Success", blog })
    } else {
        res.json({ message: "Not found" })
    }
}

export {
    addBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
    getUserBlogs
}