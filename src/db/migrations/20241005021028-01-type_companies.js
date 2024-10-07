'use strict';

/** @type {import('sequelize-cli').Migration} */

const table_name = "type_companies";
const key_index = "key_type_company_index";
const name_index = "name_type_company_index";

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
            key: {
                type: Sequelize.STRING(50),
                allowNull: true,
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
        await queryInterface.addIndex(table_name, ['key'], {
			name: key_index,
			unique: true,
		});
		await queryInterface.addIndex(table_name, ['name'], {
			name: name_index,
			unique: true,
		});
	},

	async down (queryInterface, Sequelize) {
        await queryInterface.removeIndex(table_name, key_index);
		await queryInterface.removeIndex(table_name, name_index);
		await queryInterface.dropTable(table_name);
	}
};