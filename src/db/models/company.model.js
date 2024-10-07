/**
 * Company Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'companies';

const schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    type_company_id: {
        allowNull: false,
        references: {
            model: 'type_companies',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(150),
        unique: true
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING(20),
    },
    email: {
        allowNull: true,
        type: DataTypes.STRING(150),
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

class Company extends Model {
    static associate(models){
        this.belongsTo(models.Type_Company, {foreignKey: 'type_company_id', as: 'type_company' });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'Company',
            timestamps: true,
            paranoid: true, // softdelete 
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
        }
    }
}

export default { table, schema, Company };