import Joi from 'joi';

const email = Joi.string().email().max(150);
const password = Joi.string().max(150);

const login = Joi.object({
    email : email.required(),
    password: password.required()
});

export default {
    login
}