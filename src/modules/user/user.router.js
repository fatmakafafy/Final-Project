
import express from 'express'
import { signIn, signup } from './user.controller.js'
import { signInSchema, signUpSchema } from './user.validation.js'
import { validation } from '../../middleware/validation.js'

const userRouter = express.Router()

userRouter.post('/signup', validation(signUpSchema), signup)
userRouter.post('/signIn', validation(signInSchema), signIn)

export default userRouter