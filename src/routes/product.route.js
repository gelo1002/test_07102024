import express from 'express';
import productController from '../controllers/product.controller.js';
import productSchema from '../schemas/product.schema.js';
import validatorHandler from '../middlewares/validator.middleware.js';
import checkCompany from '../middlewares/company.middleware.js';
const router = express.Router();

router.get('/all',checkCompany('provider', 'company'), productController.listAll);

router.get('/', checkCompany('provider'), productController.list);

router.get('/:id',checkCompany('provider'), validatorHandler(productSchema.show, 'params'), productController.show);

router.post('/', checkCompany('provider'), validatorHandler(productSchema.create, 'body'), productController.create);

router.put('/:id', checkCompany('provider'), validatorHandler(productSchema.show, 'params'), validatorHandler(productSchema.update, 'body'), productController.update);

router.delete('/:id', checkCompany('provider'), validatorHandler(productSchema.show, 'params'), productController.remove);

export default router;