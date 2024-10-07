/**
 * Type_Company Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'type_companies';

const schema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true
    },
    key: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true
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
}

class Type_Company extends Model {
    static associate(){

    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'Type_Company',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
}

export default { table, schema, Type_Company };