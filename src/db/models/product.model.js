/**
 * Product Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'products';

const schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    company_id: {
        allowNull: false,
        references: {
            model: 'companies',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    category_id: {
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    code:{
        allowNull: false,
        type: DataTypes.STRING(50)
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(250)
    },
    unit_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10,2)
    },
    stock: {
        allowNull: false,
        type: DataTypes.INTEGER(10)
    },
    active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
    }
}

class Product extends Model {
    static associate(models){
        this.belongsTo(models.Company, {foreignKey: 'company_id', as: 'company' });
        this.belongsTo(models.Category, {foreignKey: 'category_id', as: 'category' });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'Product',
            timestamps: true,
            paranoid: true, // softdelete 
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
        }
    }
}

export default { table, schema, Product };