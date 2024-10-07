import express from 'express';
import typeDealingController from '../controllers/type_dealing.controller.js';

const router = express.Router();

router.get('/', typeDealingController.list);

export default router;