import passport from 'passport';

import config from './config.js';
import role from '../routes/role.route.js';
import category from '../routes/category.route.js';
import type_company from '../routes/type_company.route.js';
import type_dealing from '../routes/type_dealing.route.js';
import company from '../routes/company.route.js';
import product from '../routes/product.route.js';
import user from '../routes/user.route.js';
import dealing from '../routes/dealing.route.js';
import auth from '../routes/auth.route.js';

import checkRoles from '../middlewares/auth.middleware.js';
const version = config.version;

const routes = (app) => {
    app.use(`${version}/auth`, auth);
    app.use(`${version}/categories`, passport.authenticate('jwt', {session: false}), category);
    app.use(`${version}/roles`, passport.authenticate('jwt', {session: false}), checkRoles('admin'), role);
    app.use(`${version}/type-companies`, passport.authenticate('jwt', {session: false}), checkRoles('admin'), type_company);
    app.use(`${version}/type-dealing`, passport.authenticate('jwt', {session: false}), checkRoles('admin'), type_dealing);
    app.use(`${version}/companies`, passport.authenticate('jwt', {session: false}), checkRoles('admin'), company);
    app.use(`${version}/users`, passport.authenticate('jwt', {session: false}), checkRoles('admin'), user);
    app.use(`${version}/products`, passport.authenticate('jwt', {session: false}), checkRoles('user'), product);
    app.use(`${version}/dealings`, passport.authenticate('jwt', {session: false}), checkRoles('user'), dealing);
}
export default routes;