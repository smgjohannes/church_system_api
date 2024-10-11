const uuid = require('uuid');
const passwordUtils = require('../utils/password');

('use strict');

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPasswordHash = await passwordUtils.hash('adminpwd2');
    const superadminPasswordHash = await passwordUtils.hash('superadminpwd1');
    const userPasswordHash = await passwordUtils.hash('userpwd3');
    console.log('adminPasswordHash:', adminPasswordHash);
    console.log('superadminPasswordHash:', superadminPasswordHash);
    console.log('userPasswordHash:', userPasswordHash);
    return await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuid.v4(),
          name: 'Matthew Samba',
          email: 'admin@moonsnacksfoods.com',
          role: 'admin',
          password: adminPasswordHash,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          name: 'Johannes',
          email: 'johannes@gmail.com',
          role: 'superadmin',
          password: superadminPasswordHash,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          name: 'Salom',
          email: 'salom@gmail.com',
          role: 'user',
          password: userPasswordHash,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
