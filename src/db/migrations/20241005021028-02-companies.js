'use strict';

/** @type {import('sequelize-cli').Migration} */

const table_name = "companies";
const name_index = "name_company_index";

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable(table_name, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			type_company_id: {
				allowNull: false,
				references: {
					model: 'type_companies',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING(150),
			},
			phone: {
				allowNull: false,
				type: Sequelize.STRING(20),
			},
			email: {
				allowNull: true,
				type: Sequelize.STRING(150),
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
