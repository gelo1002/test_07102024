/**
 * User Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'users';

const schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    role_id: {
        allowNull: true,
        references: {
            model: 'roles',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    company_id: {
        allowNull: true,
        references: {
            model: 'companies',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(100),
    },
    last_name: {
        allowNull: true,
        type: DataTypes.STRING(100),
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(150),
    },
    password: {
        allowNull: true,
        type: DataTypes.STRING(500),
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING(20),
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        unique: true
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

class User extends Model {
    static associate(models){
        this.belongsTo(models.Company, {foreignKey: 'company_id', as: 'company' });
        this.belongsTo(models.Role, {foreignKey: 'role_id', as: 'role' });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'User',
            timestamps: true,
            paranoid: true, // softdelete 
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
        }
    }
}

export default { table, schema, User };