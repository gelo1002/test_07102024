import responseGeneral from '../helpers/response.helper.js';
import generalHelper from '../helpers/general.helper.js'; 
import sequelize from '../config/sequelize.js';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

const { User, Role, Company } = sequelize.models;

async function list(req, res, next) {
    try {
        const data = await User.findAll({ 
            attributes: { exclude: ['password'] },
            include: [ 
                {
                    model: Role,
                    as: 'role',
                    attributes: ['name','key']
                },
                {
                    model: Company,
                    as: 'company',
                    attributes: ['name']
                } 
            ],
            paranoid: false 
        });

        return responseGeneral(res, 1, 200, data);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const body = req.body;
        const hash = bcrypt.hashSync(body.password, 10);

        let validator = await generalHelper.findByAttributes({ id: body.role_id }, Role);
        if(!validator) {
            return responseGeneral(res, 0, 400, null, "El role incorrecto");
        }

        if(body.company_id) {
            validator = await generalHelper.findByAttributes({ id: body.company_id }, Company);
            if(!validator) {
                return responseGeneral(res, 0, 400, null, "La empresa es incorrecta");
            }
        }
        else {
            if(validator.key != "admin") {
                return responseGeneral(res, 0, 400, null, "company_id es requerido");
            }
        }

        validator = await generalHelper.findByAttributes({ email: body.email}, User);
        if(validator) {
            return responseGeneral(res, 0, 400, null, "El email ya fue registrado");
        }

        if(body.password !== body.password_confirmation) {
            return responseGeneral(res, 0, 400, null, "Las password deben ser iguales");
        }

        const result = await sequelize.transaction(async(t) => {
            const user = await User.create({
                role_id: body.role_id,
                company_id: body.company_id,
                name: body.name,
                last_name: body.last_name,
                phone: body.phone,
                email: body.email,
                password: hash,
                active: 1,
                email_verified: 1
            },
                { transaction: t }
            );
            return user;
        });

        return responseGeneral(res, 1, 200, result);
    } catch (e) {
        next(e);
    }
}

async function show(req, res, next){
    try {
        const { id } = req.params;
        const user = await generalHelper.findByAttributes({ id: id }, User);

        if(user) {
            return responseGeneral(res, 1, 200, user);
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
        
        let validator = await generalHelper.findByAttributes({id: id}, User);
        if(!validator) {
            return responseGeneral(res, 0, 404);
        }
        if(body.role_id) {
            let validator = await generalHelper.findByAttributes({ id: body.role_id }, Role);
            if(!validator) {
                return responseGeneral(res, 0, 400, null, "El role incorrecto");
            }
        }
        if(body.company_id) {
            validator = await generalHelper.findByAttributes({id: body.company_id}, Company);
            if(!validator) {
                return responseGeneral(res, 0, 400, null, "La empresa es incorrecta");
            }
        }
        if(body.email) {
            let where =  {
                [Op.and]: [
                    { email: body.email },
                    {
                        id: {
                        [Op.ne]: id,
                        }
                    }
                ]
            }
            validator = await generalHelper.findByAttributes(where, User);
            if(validator) {
                return responseGeneral(res, 0, 400, null, "El email ya fue registrado");
            }
        }
        
        if(Object.keys(body).length) {
            const result = await sequelize.transaction(async(t) => {
                const user = await User.update(body,
                    { where: { id } },
                    { transaction: t }
                );
                return user;
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
        const user = req.user; 
        const { id } = req.params;
        const validator = await generalHelper.findByAttributes({ id : id }, User);
        
        if(validator) {
            if(user.sub == validator.id) {
                return responseGeneral(res, 0, 400, null, "No te puedes eliminar a ti mismo");
            }
            await User.destroy({
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