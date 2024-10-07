import express from 'express';
import userController from '../controllers/user.controller.js';
import userSchema from '../schemas/user.schema.js';
import validatorHandler from '../middlewares/validator.middleware.js';

const router = express.Router();

router.get('/', userController.list);

router.get('/:id', validatorHandler(userSchema.show, 'params'), userController.show);

router.post('/', validatorHandler(userSchema.create, 'body'), userController.create);

router.put('/:id', validatorHandler(userSchema.show, 'params'), validatorHandler(userSchema.update, 'body'), userController.update);

router.delete('/:id', validatorHandler(userSchema.show, 'params'), userController.remove);

export default router;