/**
 * Detail_Dealing Schema
 */
import { Sequelize, DataTypes, Model } from 'sequelize';

const table = 'details_dealings';

const schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    dealing_id: {
        allowNull: true,
        references: {
            model: 'dealings',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    product_id: {
        allowNull: true,
        references: {
            model: 'products',
            key: 'id',
        },
        type: DataTypes.INTEGER,
    },
    unit_price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10,2)
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER(10)
    },
    subtotal: {
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

class Detail_Dealing extends Model {
    static associate(models){
        this.belongsTo(models.Product, {foreignKey: 'product_id', as: 'product' });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName : table,
            modelName: 'Detail_Dealing',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
}

export default { table, schema, Detail_Dealing };