import express from 'express';
import categoryController from '../controllers/category.controller.js';
import categorySchema from '../schemas/category.schema.js';
import validatorHandler from '../middlewares/validator.middleware.js';
import checkRoles from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', categoryController.list);

router.get('/:id', checkRoles('admin'), validatorHandler(categorySchema.show, 'params'), categoryController.show);

router.post('/', checkRoles('admin'), validatorHandler(categorySchema.create, 'body'), categoryController.create);

router.put('/:id', checkRoles('admin'), validatorHandler(categorySchema.show, 'params'), validatorHandler(categorySchema.update, 'body'), categoryController.update);

router.delete('/:id', checkRoles('admin'),validatorHandler(categorySchema.show, 'params'), categoryController.remove);

export default router;