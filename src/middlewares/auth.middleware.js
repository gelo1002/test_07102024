import sequelize from '../config/sequelize.js';
import boom from '@hapi/boom'
const { User, Role, Company } = sequelize.models;

function checkRoles(...roles){
    return async (req, res, next) => {
        const id = req.user.sub;

        const user = await User.findOne({ 
            where : { id },
            include: [ 
                {
                    model: Role,
                    as: 'role',
                    attributes: ['name','key']
                },
                {
                    model: Company,
                    as: 'company',
                    attributes: ['id', 'name', 'active']
                }
            ], 
        });

        if(!user) {
            return next(boom.unauthorized("Usuario no encontrado"));
        }
        if(!user.active) {
            return next(boom.unauthorized("no activo"));
        }

        if(user.company_id) {
            if(!user.company){
                return next(boom.unauthorized("Tu empresa no esta activa por el momento"));
            }
            else if(!user.company.active) {
                return next(boom.unauthorized("Tu empresa no esta activa por el momento")); 
            }
        }
        
        if (roles.includes(user.role.key)) {
            req.user.company_id = user.company_id;
            next();
        } else {
            return next(boom.unauthorized());
        }
    }
}

export default checkRoles;
