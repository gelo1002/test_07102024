import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import generalHelper from '../../../helpers/general.helper.js';
import boom from '@hapi/boom';
import sequelize from '../../../config/sequelize.js';
const { User } = sequelize.models;

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done)=>{
    try {
        const user = await generalHelper.findUserByEmail(email);

        if (!user) {
            return done(boom.unauthorized("El correo electrónico y/o la contraseña que ingresaste son incorrectos."), false);
        }
        else {

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(boom.unauthorized("El correo electrónico y/o la contraseña que ingresaste son incorrectos."), false);
            }

            if(!user.active){
                return done(boom.unauthorized("Usuario no activo."), false);
            }
        }
        delete user.dataValues.password;
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

export default LocalStrategy;