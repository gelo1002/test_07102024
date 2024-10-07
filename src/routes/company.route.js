import express from 'express';
import companyController from '../controllers/company.controller.js';
import companySchema from '../schemas/company.schema.js';
import validatorHandler from '../middlewares/validator.middleware.js';

const router = express.Router();

router.get('/', companyController.list);

router.get('/:id', validatorHandler(companySchema.show, 'params'), companyController.show);

router.post('/', validatorHandler(companySchema.create, 'body'), companyController.create);

router.put('/:id', validatorHandler(companySchema.show, 'params'), validatorHandler(companySchema.update, 'body'), companyController.update);

router.delete('/:id', validatorHandler(companySchema.show, 'params'), companyController.remove);

export default router;