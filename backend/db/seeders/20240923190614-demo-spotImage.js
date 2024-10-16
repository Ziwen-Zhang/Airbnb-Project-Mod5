'use strict';
const { SpotImage } = require('../models');
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId:1,
        url:'/preview.png',
        preview:true
      },
      {
        spotId:2,
        url:'/preview.png',
        preview:true
      },
      {
        spotId:3,
        url:'/preview.png',
        preview:true
      },      {
        spotId:4,
        url:'/preview.png',
        preview:true
      },      {
        spotId:5,
        url:'/preview.png',
        preview:true
      },{
        spotId:6,
        url:'/preview.png',
        preview:true
      },

      { spotId: 1, url: '/detail1.png', preview: false },
      { spotId: 1, url: '/detail2.png', preview: false },
      { spotId: 1, url: '/detail3.png', preview: false },
      { spotId: 1, url: '/detail4.png', preview: false },

      { spotId: 2, url: '/detail1.png', preview: false },
      { spotId: 2, url: '/detail2.png', preview: false },
      { spotId: 2, url: '/detail3.png', preview: false },
      { spotId: 2, url: '/detail4.png', preview: false },

      { spotId: 3, url: '/detail1.png', preview: false },
      { spotId: 3, url: '/detail2.png', preview: false },
      { spotId: 3, url: '/detail3.png', preview: false },
      { spotId: 3, url: '/detail4.png', preview: false },

      { spotId: 4, url: '/detail1.png', preview: false },
      { spotId: 4, url: '/detail2.png', preview: false },
      { spotId: 4, url: '/detail3.png', preview: false },
      { spotId: 4, url: '/detail4.png', preview: false },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6] }
    }, {});
  }
};
