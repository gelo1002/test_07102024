import Joi from 'joi';

const id = Joi.string().max(10);

const product_id = Joi.number().integer();
const amount = Joi.number().integer();

const create = Joi.object({
    products : Joi.array().items(
        Joi.object({
            product_id: product_id.required(),
            amount: amount.required(),
        })
    ).required().min(1)
});

const update = Joi.object({
    products : Joi.array().items(
        Joi.object({
            product_id: product_id.required(),
            amount: amount.required(),
        })
    ).required().min(1)
});

const show = Joi.object({
    id : id.required(),
});

export default {
    show,
    create,
    update
}