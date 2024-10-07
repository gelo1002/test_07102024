'use strict';

/** @type {import('sequelize-cli').Migration} */

const table_name = "type_dealings";

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