/**
 * Category Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'categories';

const schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(200),
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
    }
}

class Category extends Model {
    static associate(){

    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'Category',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
}

export default { table, schema, Category };