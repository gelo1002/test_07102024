import responseGeneral from '../helpers/response.helper.js';
import generalHelper from '../helpers/general.helper.js';
import sequelize from '../config/sequelize.js';
import { Op } from 'sequelize';

const { Product, Company, Category } = sequelize.models;


async function listAll(req, res, next) {
    try {
        const user =  req.user;

        const data = await Product.findAll({ where: {company_id : { [Op.ne]: user.company_id } }, paranoid: false });

        return responseGeneral(res, 1, 200, data);
    } catch (e) {
        next(e);
    }
}

async function list(req, res, next) {
    try {
        const user =  req.user;

        const data = await Product.findAll({ where: {company_id : user.company_id}, paranoid: false });

        return responseGeneral(res, 1, 200, data);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const body = req.body;
        const user =  req.user;
        let validator = await generalHelper.findByAttributes({id: body.category_id}, Category);
        if(!validator) {
            return responseGeneral(res, 0, 400, null, "Categoria no permitida");
        }

        let where =  {
            [Op.and]: [
                { company_id: user.company_id }
            ],
            [Op.or]: [
                { code: body.code },
                { name: body.name }
            ]
        }

        validator = await generalHelper.findByAttributes(where, Product);
        if(validator) {
            return responseGeneral(res, 0, 400, null, "El nombre/código ya fue registrado");
        }

        const result = await sequelize.transaction(async(t) => {
            const product = await Product.create({
                company_id: user.company_id,
                category_id: body.category_id,
                code: body.code,
                name: body.name,
                description: body.description,
                unit_price: body.unit_price,
                stock: body.stock,
                active: 1,
            },
                { transaction: t }
            );
            return product;
        });

        return responseGeneral(res, 1, 200, result);
    } catch (e) {
        next(e);
    }
}

async function show(req, res, next){
    try {
        const { id } = req.params;
        const user = req.user;
        let where = {
            [Op.and]: [
                { company_id: user.company_id },
                { id: id },
            ],
        }
        const product = await generalHelper.findByAttributes(where, Product);

        if(product) {
            return responseGeneral(res, 1, 200, product);
        }
        return responseGeneral(res, 0, 404);

    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const body = req.body;
        const id = req.params.id;
        const user =  req.user;

        let where = {
            [Op.and]: [
                { company_id: user.company_id },
                { id: id },
            ],
        }

        let validator = await generalHelper.findByAttributes(where, Product);
        if(!validator) {
            return responseGeneral(res, 0, 404);
        }

        if(body.category_id) {
            validator = await generalHelper.findByAttributes({id: body.category_id}, Category);
            if(!validator) {
                return responseGeneral(res, 0, 400, null, "Categoria no permitida");
            }
        }

        where =  {
            [Op.and]: [
                { company_id: user.company_id },
                {
                    id: {
                        [Op.ne]: id,
                    }
                }
            ],
            [Op.or]: [
                { code: body.code },
                { name: body.name }
            ]
        }

        validator = await generalHelper.findByAttributes(where, Product);
        if(validator) {
            return responseGeneral(res, 0, 400, null, "El nombre/código ya fue registrado");
        }
        
        if(Object.keys(body).length) {
            const result = await sequelize.transaction(async(t) => {
                const product = await Product.update(body,
                    { where: { id } },
                    { transaction: t }
                );
                return product;
            });
    
            return responseGeneral(res, 1, 200);
        }
        return responseGeneral(res, 1, 200, null, "Sin cambios");
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next){
    try {
        const { id } = req.params;
        const user = req.user;
        let where = {
            [Op.and]: [
                { company_id: user.company_id },
                { id: id },
            ],
        }

        const product = await generalHelper.findByAttributes(where, Product);

        if(product) {
            await Product.destroy({
                where: { id }
            });
            return responseGeneral(res, 1, 200, null, "Eliminación realizada correctamente");
        }
        return responseGeneral(res, 0, 404);

    } catch (e) {
        next(e);
    }
}

export default {
    listAll,
    list,
    create,
    show,
    update,
    remove
}