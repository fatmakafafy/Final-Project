import Joi from 'joi';

const addChildSchema = Joi.object({
    name: Joi.string().min(3).max(80).required(),
    age: Joi.number().integer().min(0).required(),
    weight: Joi.number().positive().required(),
    height: Joi.number().positive().required(),
    SpO2: Joi.number().min(0).max(100).required(),
    heartRate: Joi.number().positive().required(),
    parentId: Joi.string().hex().length(24).required()
});

const updateChildSchema = Joi.object({
    name: Joi.string().min(3).max(80),
    age: Joi.number().integer().min(0),
    weight: Joi.number().positive(),
    height: Joi.number().positive(),
    SpO2: Joi.number().min(0).max(100),
    heartRate: Joi.number().positive(),
    parentId: Joi.string().hex().length(24)
});

export { addChildSchema, updateChildSchema };

