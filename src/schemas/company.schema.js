import Joi from 'joi';

const id = Joi.string().max(10);
const type_company_id = Joi.number().integer();
const name = Joi.string().max(150);
const phone = Joi.string().max(20);
const email = Joi.string().email().max(150);

const create = Joi.object({
    type_company_id : type_company_id.required(),
    name: name.required(),
    phone: phone.required(),
    email: email
});

const update = Joi.object({
    type_company_id : type_company_id,
    name: name,
    phone: phone,
    email: email
});

const show = Joi.object({
    id : id.required(),
});

export default {
    show,
    create,
    update
}
