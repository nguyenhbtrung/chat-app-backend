'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Friendships', 'status', {
      type: Sequelize.ENUM('pending', 'accepted', 'rejected', 'blocked', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Friendships', 'status', {
      type: Sequelize.ENUM('pending', 'accepted', 'rejected', 'blocked'),
      allowNull: false,
      defaultValue: 'pending',
    });
  }
};
