import responseGeneral from '../helpers/response.helper.js';
import generalHelper from '../helpers/general.helper.js';
import sequelize from '../config/sequelize.js';
import { Op } from 'sequelize';

const { Company, Type_Company } = sequelize.models;

async function list(req, res, next) {
    try {
        const data = await Company.findAll({ paranoid: false });

        return responseGeneral(res, 1, 200, data);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const body = req.body;

        let validator = await generalHelper.findByAttributes({id: body.type_company_id}, Type_Company);
        if(!validator) {
            return responseGeneral(res, 0, 400, null, "Tipo de empresa no permitido");
        }

        validator = await generalHelper.findByAttributes({name: body.name}, Company);
        if(validator) {
            return responseGeneral(res, 0, 400, null, "El nombre ya fue registrado");
        }

        const result = await sequelize.transaction(async(t) => {
            const company = await Company.create({
                type_company_id: body.type_company_id,
                name: body.name,
                phone: body.phone,
                email: body.email
            },
                { transaction: t }
            );
            return company;
        });

        return responseGeneral(res, 1, 200, result);
    } catch (e) {
        next(e);
    }
}

async function show(req, res, next){
    try {
        const { id } = req.params;
        const company = await generalHelper.findByAttributes({ id: id }, Company);

        if(company) {
            return responseGeneral(res, 1, 200, company);
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
        
        let validator = await generalHelper.findByAttributes({id: id}, Company);
        if(!validator) {
            return responseGeneral(res, 0, 404);
        }
        if(body.type_company_id) {
            validator = await generalHelper.findByAttributes({id: body.type_company_id}, Type_Company);
            if(!validator) {
                return responseGeneral(res, 0, 400, null, "Tipo de empresa no permitido");
            }
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
            validator = await generalHelper.findByAttributes(where, Company);
            if(validator) {
                return responseGeneral(res, 0, 400, null, "El nombre ya fue registrado");
            }
        }
        
        if(Object.keys(body).length) {
            const result = await sequelize.transaction(async(t) => {
                const company = await Company.update(body,
                    { where: { id } },
                    { transaction: t }
                );
                return company;
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
        const company = await generalHelper.findByAttributes({ id }, Company);

        if(company) {
            await Company.destroy({
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