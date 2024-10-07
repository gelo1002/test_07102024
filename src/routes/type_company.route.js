import express from 'express';
import typeCompanyController from '../controllers/type_company.controller.js';

const router = express.Router();

router.get('/', typeCompanyController.list);

export default router;