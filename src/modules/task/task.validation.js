import Joi from "joi";

const addTaskSchema = Joi.object({
    title: Joi.string().min(3).max(80).required(),
    description: Joi.string().min(3).max(80).required() //,
    // createdBy: Joi.string().hex().length(24)
})

export {
    addTaskSchema
}
