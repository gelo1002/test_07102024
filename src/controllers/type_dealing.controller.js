import responseGeneral from '../helpers/response.helper.js';
import sequelize from '../config/sequelize.js';
const { Type_Dealing } = sequelize.models;

async function list(req, res, next) {
    try {
        const data = await Type_Dealing.findAll();

        return responseGeneral(res, 1, 200, data);
    } catch (e) {
        next(e);
    }
}

export default {
    list
}