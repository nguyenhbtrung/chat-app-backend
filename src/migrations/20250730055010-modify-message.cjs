'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Messages', 'type', {
      type: Sequelize.ENUM('text', 'file', 'media'),
      allowNull: false,
      defaultValue: 'text',
    });

    await queryInterface.addColumn('Messages', 'revoked', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn('Messages', 'fileId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Files',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Messages', 'type', {
      type: Sequelize.ENUM('text', 'file', 'image'),
      allowNull: false,
      defaultValue: 'text',
    });

    await queryInterface.removeColumn('Messages', 'revoked');

    await queryInterface.removeColumn('Messages', 'fileId');
  }
};
