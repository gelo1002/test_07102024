import express from 'express';
import authController from '../controllers/auth.controller.js';
import validatorHandler from '../middlewares/validator.middleware.js';
import authSchema from '../schemas/auth.schema.js';
import passport from 'passport';

const router = express.Router();

router.post('/login',
    validatorHandler(authSchema.login, 'body'),
    passport.authenticate('local', { session: false }),
    authController.login
);


export default router;