import express from "express";
import * as taskController from "./task.controller.js";
import { userAuth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { addTaskSchema } from "./task.validation.js";

const taskRouter = express.Router();

taskRouter.post('/', validation(addTaskSchema), userAuth, taskController.addTask);
taskRouter.get('/', userAuth, taskController.getAllTasks);
taskRouter.get('/:id', userAuth, taskController.getUserTasks);
taskRouter.put('/', userAuth, taskController.updateTask);
taskRouter.delete('/', userAuth, taskController.deleteTask);

export default taskRouter;
