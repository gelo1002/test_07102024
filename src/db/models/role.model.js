/**
 * Role Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'roles';

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
    description: {
        allowNull: false,
        type: DataTypes.STRING(100)
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

class Role extends Model {
    static associate(){

    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'Role',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
}

export default { table, schema, Role };