import responseGeneral from '../helpers/response.helper.js';
import sequelize from '../config/sequelize.js';
const { Role } = sequelize.models;

async function list(req, res, next) {
    try {
        const data = await Role.findAll();

        return responseGeneral(res, 1, 200, data);
    } catch (e) {
        next(e);
    }
}

export default {
    list
}