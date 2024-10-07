import Joi from 'joi';

const id = Joi.string().max(10);
const role_id = Joi.number().integer();
const company_id = Joi.number().integer();
const name = Joi.string().max(100);
const last_name = Joi.string().max(100);
const email = Joi.string().email().max(150);
const password = Joi.string().min(8).max(30).regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/);
const password_confirmation = Joi.string().min(8).max(30).regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/);
const phone = Joi.string().max(20);

const create = Joi.object({
    role_id : role_id.required(),
    company_id : company_id,
    name: name.required(),
    last_name: last_name.required(),
    email: email.required(),
    password: password.required(),
    password_confirmation: password_confirmation.required(),
    phone: phone.required(),
});

const update = Joi.object({
    role_id : role_id,
    company_id : company_id,
    name : name,
    last_name: last_name,
    phone: phone,
    email: email,
    phone: phone,
});

const show = Joi.object({
    id : id.required(),
});

export default {
    show,
    create,
    update
}