import Joi from 'joi';

const id = Joi.string().max(10);
const category_id = Joi.number().integer();
const code = Joi.string().max(50);
const name = Joi.string().max(100);
const description = Joi.string().max(250);
const unit_price = Joi.number().less(100000000).precision(2);
const stock = Joi.number().integer();
const active = Joi.boolean();

const create = Joi.object({
    category_id : category_id.required(),
    code: code.required(),
    name: name.required(),
    description: description.required(),
    unit_price: unit_price.required(),
    stock: stock.required(),
    active: active.required(),
});

const update = Joi.object({
    category_id : category_id,
    code: code.required(),
    name: name.required(),
    description: description,
    unit_price: unit_price,
    stock: stock,
    active: active,
});

const show = Joi.object({
    id : id.required(),
});

export default {
    show,
    create,
    update
}