import Role from './role.model.js';
import Category from './category.model.js';
import Type_Company from './type_company.model.js';
import Type_Dealing from './type_dealing.model.js';
import Company from './company.model.js';
import Product from './product.model.js';
import User from './user.model.js';
import Dealing from './dealing.model.js';
import Detail_Dealing from './detail_dealing.model.js';

function setupModels(sequelize) {
    // Catalogs
    Role.Role.init(Role.schema, Role.Role.config(sequelize));
    Category.Category.init(Category.schema, Category.Category.config(sequelize));
    Type_Company.Type_Company.init(Type_Company.schema, Type_Company.Type_Company.config(sequelize));
    Type_Dealing.Type_Dealing.init(Type_Dealing.schema, Type_Dealing.Type_Dealing.config(sequelize));
    // Tables
    Company.Company.init(Company.schema, Company.Company.config(sequelize));
    Product.Product.init(Product.schema, Product.Product.config(sequelize));
    User.User.init(User.schema, User.User.config(sequelize));
    Dealing.Dealing.init(Dealing.schema, Dealing.Dealing.config(sequelize));
    Detail_Dealing.Detail_Dealing.init(Detail_Dealing.schema, Detail_Dealing.Detail_Dealing.config(sequelize));
    // Associate
    Company.Company.associate(sequelize.models);
    Product.Product.associate(sequelize.models);
    User.User.associate(sequelize.models);
    Dealing.Dealing.associate(sequelize.models);
    Detail_Dealing.Detail_Dealing.associate(sequelize.models);
}

export default setupModels;