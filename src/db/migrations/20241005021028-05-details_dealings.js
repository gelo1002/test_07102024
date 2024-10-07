'use strict';

/** @type {import('sequelize-cli').Migration} */

const table_name = "details_dealings";

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable(table_name, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
            dealing_id: {
				allowNull: true,
				references: {
					model: 'dealings',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
			product_id: {
				allowNull: true,
				references: {
					model: 'products',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
			unit_price: {
				allowNull: false,
				type: Sequelize.DECIMAL(10,2)
			},
			amount: {
				allowNull: false,
				type: Sequelize.INTEGER(10)
			},
			subtotal: {
				allowNull: false,
				type: Sequelize.DECIMAL(10,2)
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			}
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable(table_name);
	}
};

