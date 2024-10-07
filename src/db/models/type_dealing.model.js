/**
 * Type_Dealing Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'type_dealings';

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

class Type_Dealing extends Model {
    static associate(){

    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'Type_Dealing',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
}

export default { table, schema, Type_Dealing };