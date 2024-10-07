'use strict';

/** @type {import('sequelize-cli').Migration} */

const table = "type_dealings";

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert(table, [
            {
                name: 'Compra/Venta',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete(table, null, {});
    }
};
