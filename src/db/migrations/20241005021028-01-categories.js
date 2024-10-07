'use strict';

/** @type {import('sequelize-cli').Migration} */

const table_name = "categories";
const name_index = "name_category_index";

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable(table_name, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			description: {
				allowNull: false,
				type: Sequelize.STRING(200),
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

        await queryInterface.addIndex(table_name, ['name'], {
			name: name_index,
			unique: true,
		});
	},

	async down (queryInterface, Sequelize) {
        await queryInterface.removeIndex(table_name, name_index);
		await queryInterface.dropTable(table_name);
	}
};