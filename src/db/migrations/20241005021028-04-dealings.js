'use strict';

/** @type {import('sequelize-cli').Migration} */

const table_name = "dealings";

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable(table_name, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
            user_id: {
				allowNull: true,
				references: {
					model: 'users',
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
            provider_id: {
				allowNull: true,
				references: {
					model: 'companies',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
            type_dealing_id: {
				allowNull: true,
				references: {
					model: 'type_dealings',
					key: 'id',
				},
				type: Sequelize.INTEGER,
			},
			total: {
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

