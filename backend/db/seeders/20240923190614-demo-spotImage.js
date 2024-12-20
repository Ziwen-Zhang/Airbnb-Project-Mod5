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
        url:'/preview1.png',
        preview:true
      },
      {
        spotId:2,
        url:'/preview2.png',
        preview:true
      },
      {
        spotId:3,
        url:'/preview3.png',
        preview:true
      },      {
        spotId:4,
        url:'/preview4.png',
        preview:true
      },      {
        spotId:5,
        url:'/preview5.png',
        preview:true
      },{
        spotId:6,
        url:'/preview6.png',
        preview:true
      },

      { spotId: 1, url: '/spot1detail1.png', preview: false },
      { spotId: 1, url: '/spot1detail2.png', preview: false },
      { spotId: 1, url: '/spot1detail3.png', preview: false },
      { spotId: 1, url: '/spot1detail4.png', preview: false },

      { spotId: 2, url: '/spot2detail1.png', preview: false },
      { spotId: 2, url: '/spot2detail2.png', preview: false },
      { spotId: 2, url: '/spot2detail3.png', preview: false },
      { spotId: 2, url: '/spot2detail4.png', preview: false },

      { spotId: 3, url: '/spot3detail1.png', preview: false },
      { spotId: 3, url: '/spot3detail2.png', preview: false },
      { spotId: 3, url: '/spot3detail3.png', preview: false },
      { spotId: 3, url: '/spot3detail4.png', preview: false },

      { spotId: 4, url: '/spot4detail1.png', preview: false },
      { spotId: 4, url: '/spot4detail2.png', preview: false },
      { spotId: 4, url: '/spot4detail3.png', preview: false },
      { spotId: 4, url: '/spot4detail4.png', preview: false },

      { spotId: 5, url: '/spot5detail1.png', preview: false },
      { spotId: 5, url: '/spot5detail2.png', preview: false },
      { spotId: 5, url: '/spot5detail3.png', preview: false },
      { spotId: 5, url: '/spot5detail4.png', preview: false },

      { spotId: 6, url: '/spot6detail1.png', preview: false },
      { spotId: 6, url: '/spot6detail2.png', preview: false },
      { spotId: 6, url: '/spot6detail3.png', preview: false },
      { spotId: 6, url: '/spot6detail4.png', preview: false },
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
