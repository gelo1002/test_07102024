import responseGeneral from '../helpers/response.helper.js';
import generalHelper from '../helpers/general.helper.js'; 

async function login(req, res, next) {
    try {
        const user = req.user;
        const token = await generalHelper.generateTokenJWT(user);
        // delete user.dataValues.password;
        return responseGeneral(res, 1, 200, { token, user }, 'login');
    }
    catch (e) {
        next(e);
    }
}

export default {
    login
}