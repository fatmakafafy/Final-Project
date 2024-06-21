

import express from 'express';
import { addChild, getChildren, getChildById, updateChild, deleteChild } from './child.controller.js';
import { validation } from '../../middleware/validation.js';
import { addChildSchema, updateChildSchema } from './child.validation.js';

const childRouter = express.Router();

childRouter.post('/', validation(addChildSchema), addChild);
childRouter.get('/', getChildren);
childRouter.get('/:id', getChildById);
childRouter.put('/:id', validation(updateChildSchema), updateChild);
childRouter.delete('/:id', deleteChild);

export default childRouter;