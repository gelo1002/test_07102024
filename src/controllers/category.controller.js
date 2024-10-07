import responseGeneral from '../helpers/response.helper.js';
import generalHelper from '../helpers/general.helper.js';
import sequelize from '../config/sequelize.js';
import { Op } from 'sequelize';
const { Category, Product } = sequelize.models;

async function list(req, res, next) {
    try {
        const data = await Category.findAll({ paranoid: false });

        return responseGeneral(res, 1, 200, data);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const body = req.body;

        let validator = await generalHelper.findByAttributes({name: body.name}, Category);
        if(validator) {
            return responseGeneral(res, 0, 400, null, "El nombre ya fue registrado");
        }

        const result = await sequelize.transaction(async(t) => {
            const category = await Category.create({
                name: body.name,
                description: body.description,
            },
                { transaction: t }
            );
            return category;
        });

        return responseGeneral(res, 1, 200, result);
    } catch (e) {
        next(e);
    }
}

async function show(req, res, next){
    try {
        const { id } = req.params;
        const category = await generalHelper.findByAttributes({ id: id }, Category);

        if(category) {
            return responseGeneral(res, 1, 200, category);
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
        
        let validator = await generalHelper.findByAttributes({id: id}, Category);
        if(!validator) {
            return responseGeneral(res, 0, 404);
        }

        if(body.name) {
            let where =  {
                [Op.and]: [
                    { name: body.name },
                    {
                        id: {
                            [Op.ne]: id,
                        }
                    }
                ]
            }
            validator = await generalHelper.findByAttributes(where, Category);
            if(validator) {
                return responseGeneral(res, 0, 400, null, "EL nombre ya fue registrado");
            }
        }
        
        if(Object.keys(body).length) {
            const result = await sequelize.transaction(async(t) => {
                const category = await Category.update(body,
                    { where: { id } },
                    { transaction: t }
                );
                return category;
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

        let validator = await generalHelper.findByAttributes({category_id: id}, Product);
        if(validator) {
            return responseGeneral(res, 0, 400, null, "No se puede eliminar la información");
        }

        const category = await generalHelper.findByAttributes({ id }, Category);

        if(category) {
            await Category.destroy({
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
    list,
    create,
    show,
    update,
    remove
}