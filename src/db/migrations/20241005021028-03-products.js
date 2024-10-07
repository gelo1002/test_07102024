'use strict';

/** @type {import('sequelize-cli').Migration} */

const table_name = "products";
const code_index = "code_product_index";
const name_index = "name_product_index";

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable(table_name, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			company_id: {
				allowNull: false,
				references: {
					model: 'companies',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
			category_id: {
				allowNull: false,
				references: {
					model: 'categories',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
			code:{
				allowNull: false,
				type: Sequelize.STRING(50)
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING(100)
			},
			description: {
				allowNull: false,
				type: Sequelize.STRING(250)
			},
			unit_price: {
				allowNull: false,
				type: Sequelize.DECIMAL(10,2)
			},
			stock: {
				allowNull: false,
				type: Sequelize.INTEGER(10)
			},
			active: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: true,
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
			},
			deleted_at: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			}
		});

		await queryInterface.addIndex(table_name, ['code'], {
			name: code_index,
			unique: false,
		});
		await queryInterface.addIndex(table_name, ['name'], {
			name: name_index,
			unique: false,
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.removeIndex(table_name, code_index);
		await queryInterface.removeIndex(table_name, name_index);
		await queryInterface.dropTable(table_name);
	}
};
