'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName:'lition',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: 'Fake',
        lastName:'User2',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        firstName: 'Fake',
        lastName:'User3',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        firstName: 'Fake',
        lastName:'User4',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user5@user.io',
        firstName: 'Fake',
        lastName:'User5',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user6@user.io',
        firstName: 'Fake',
        lastName:'User6',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password6')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'FakeUser5', 'FakeUser6'] }
    }, {});
  }
};