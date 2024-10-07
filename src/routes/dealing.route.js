import express from 'express';
import dealingController from '../controllers/dealing.controller.js';
import dealingSchema from '../schemas/dealing.schema.js';
import validatorHandler from '../middlewares/validator.middleware.js';

const router = express.Router();

router.get('/', dealingController.list);

router.get('/:id', validatorHandler(dealingSchema.show, 'params'), dealingController.show);

router.post('/', validatorHandler(dealingSchema.create, 'body'), dealingController.create);

router.put('/:id', validatorHandler(dealingSchema.show, 'params'), validatorHandler(dealingSchema.update, 'body'), dealingController.update);

router.delete('/:id', validatorHandler(dealingSchema.show, 'params'), dealingController.remove);

export default router;