import sequelize from '../config/sequelize.js';
import boom from '@hapi/boom'
const { Company, Type_Company } = sequelize.models;

function checkCompany(...companies){
    return async (req, res, next) => {
        const company_id = req.user.company_id;

        const company = await Company.findOne({ 
            where : { id: company_id },
            include: [ 
                {
                    model: Type_Company,
                    as: 'type_company',
                    attributes: ['name','key']
                },
            ], 
        });

        if (companies.includes(company.type_company.key)) {
            next();
        } else {
            return next(boom.unauthorized('No eres un proveedor'));
        }
    }
}

export default checkCompany;
