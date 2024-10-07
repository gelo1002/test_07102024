/**
 * Dealing Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'dealings';

const schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    user_id: {
        allowNull: true,
        references: {
            model: 'users',
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
    provider_id: {
        allowNull: true,
        references: {
            model: 'companies',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    type_dealing_id: {
        allowNull: true,
        references: {
            model: 'type_dealings',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    total: {
        allowNull: false,
        type: DataTypes.DECIMAL(10,2)
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

class Dealing extends Model {
    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Company, {foreignKey: 'company_id', as: 'company' });
        this.belongsTo(models.Company, {foreignKey: 'provider_id', as: 'provider' });
        this.belongsTo(models.Type_Dealing, {foreignKey: 'type_dealing_id', as: 'type_dealing' });
        this.hasMany(models.Detail_Dealing, {foreignKey: 'dealing_id', as: 'detail_dealing' });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'Dealing',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
}

export default { table, schema, Dealing };