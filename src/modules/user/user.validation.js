// import Joi from "joi";

// const signUpSchema = Joi.object({
//     name: Joi.string().min(3).max(80).required(),
//     email: Joi.string().email({ tlds: { allow: ['com'] } }).required(),
//     password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,30}$/).required(),
//     rePassword: Joi.ref('password')
// })
// const signInSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,30}$/).required()
// })
// export{
//     signUpSchema,
//     signInSchema
// }


import Joi from "joi";

const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(80).required(),
    email: Joi.string().email({ tlds: { allow: ['com'] } }).required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,30}$/).required(),
    rePassword: Joi.ref('password')
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,30}$/).required()
});

const updateUserInfoSchema = Joi.object({
    name: Joi.string().min(3).max(80),
    email: Joi.string().email({ tlds: { allow: ['com'] } }),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,30}$/)
});

// Validation schema for getting user information (if you want to validate query parameters or route parameters)
const getUserInfoSchema = Joi.object({
    // Assuming you're getting user info by query parameters or route parameters
    // For example: /user?email=someone@example.com
    email: Joi.string().email().required()
});
export {
    signUpSchema,
    signInSchema,
    updateUserInfoSchema,
    getUserInfoSchema
};
