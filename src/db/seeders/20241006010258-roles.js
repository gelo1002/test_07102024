'use strict';

/** @type {import('sequelize-cli').Migration} */

const table = "roles";

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert(table, [
            {
                name: 'Administrador',
                key: 'admin',
                description: 'Administardor del sistema',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Usuario',
                key: 'user',
                description: 'Usuario de Empresa',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete(table, null, {});
    }
};
