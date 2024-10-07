'use strict';

/** @type {import('sequelize-cli').Migration} */

const table_name = "users";
const email_index = "email_company_index";

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable(table_name, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			role_id: {
				allowNull: true,
				references: {
					model: 'roles',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
			company_id: {
				allowNull: true,
				references: {
					model: 'companies',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING(100),
			},
			last_name: {
				allowNull: true,
				type: Sequelize.STRING(100),
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING(150),
			},
			password: {
				allowNull: true,
				type: Sequelize.STRING(500),
			},
			phone: {
				allowNull: true,
				type: Sequelize.STRING(20),
			},
			email_verified: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
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
		await queryInterface.addIndex(table_name, ['email'], {
			name: email_index,
			unique: true,
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.removeIndex(table_name, email_index);
		await queryInterface.dropTable(table_name);
	}
};
