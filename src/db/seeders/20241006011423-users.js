'use strict';
require('dotenv').config();
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcryptjs');
const table = "users";
const password = bcrypt.hashSync(process.env.TEST_PASSWORD, 10);

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert(table, [
            {
                role_id : 1,
                name: 'admin',
                last_name: 'admin',
                email: 'admin@test.com',
                password: password,
                email_verified: 1,
				phone: '5512345678',
                active: 1,
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete(table, null, {});
	}
};
