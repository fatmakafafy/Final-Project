import express from "express";
import * as blogController from "./blog.controller.js";
import { userAuth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { addBlogSchema } from "./blog.validation.js";

const blogRouter=express.Router()

blogRouter.post('/',validation(addBlogSchema),userAuth,blogController.addBlog)
blogRouter.get('/',userAuth,blogController.getAllBlogs)
blogRouter.get('/:id',blogController.getUserBlogs)
blogRouter.put('/',userAuth,blogController.updateBlog)
blogRouter.delete('/',userAuth,blogController.deleteBlog)


export default blogRouter