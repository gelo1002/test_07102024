import Joi from 'joi';

const id = Joi.string().max(10);
const name = Joi.string().max(100);
const description = Joi.string().max(200);

const create = Joi.object({
    name: name.required(),
    description: description.required(),
});

const update = Joi.object({
    name: name,
    description: description,
});

const show = Joi.object({
    id : id.required(),
});

export default {
    show,
    create,
    update
}
