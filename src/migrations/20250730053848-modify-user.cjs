'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'avatarImgId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Files',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.removeColumn('Users', 'avatarUrl');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'avatarImgId');
    await queryInterface.addColumn('Users', 'avatarUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
