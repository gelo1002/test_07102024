'use strict';

/** @type {import('sequelize-cli').Migration} */

const table = "type_companies";

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert(table, [
            {
                name: 'Empresa',
                key: 'company',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Proveedor',
                key: 'provider',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete(table, null, {});
    }
};
