'use strict';

const { Spot } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Niseko street',
        city: 'Niseko',
        state: 'Abuta',
        country: 'Japan',
        lat: 50,
        lng: 100,
        name: 'Niseko Mountain Guides Lodge',
        description: "Fully furnished lodge that backs up to the forest at the base of Yotei-san, Niseko's iconic stratovolcano. If relaxing with friends in a peaceful setting, cooking, and enjoying the radiating warmth and sounds of a wood-burning stove appeal to you after a great day of skiing, look no further. ",
        price: 100,
      },
      {
        ownerId: 2,
        address: '222 Lancaster street',
        city: 'Lancaster',
        state: 'OH',
        country: 'United States',
        lat: 50,
        lng: 100,
        name: 'The Ledges Cabin at Blue Valley',
        description: "The Ledges Cabin is a luxury stay that sits on 35 wooded acres filled with sandstone cliffs, caves, flora, and fauna. It has three bedrooms and a pull out couch, a full kitchen, a wood-burning stove, and massive windows with a great view of the Ledges. It also has an eight-seat hot tub, a large deck, firepit, plenty of hiking with beautiful rock outcroppings, and a creek that runs through the middle of the property.",
        price: 200,
      },
      {
        ownerId: 3,
        address: '333 Hawley street',
        city: 'Hawley',
        state: 'PA',
        country: 'United States',
        lat: 50,
        lng: 100,
        name: 'Gorgeous Luxury Treehouse Cabin',
        description: "Come enjoy a night in the trees at this absolutely gorgeous freestanding treehouse/tiny home. This beautiful little 200 sq ft rustic cabin in the air, has absolutely everything you could ever want from your vacation including a pull out sofa bed and a regular bed, hot and cold running water, regular toilet, everything you need to cook, Wi-Fi, TV,  and the most comfortable bed you've ever slept in. This tiny home is surprisingly spacious and offers an outdoor three season Lounge with a TV.",
        price: 300,
      },
      {
        ownerId: 4,
        address: '444 Orland street',
        city: 'Orland',
        state: 'ME',
        country: 'United States',
        lat: 50,
        lng: 100,
        name: 'Magical Lakefront Cabin on 5 Acres-25 Mi to Acadia',
        description: "Summer 2025 dates available! Enjoy a truly immersive experience in our unique open air lakefront cabin. The expansive screen windows allow you to lounge in comfort and feel the fresh air as you experience the birds chirping, loons calling, and frogs singing at night.",
        price: 400,
      },
      {
        ownerId: 5,
        address: '555 North Myrtle Beach street',
        city: 'North Myrtle Beach',
        state: 'SC',
        country: 'United States',
        lat: 50,
        lng: 100,
        name: "Almost Heaven at Avista 1614, Bird's Eye Views!",
        description: "Confused about which condo to choose for your vacation? Look no further!  Experience the ultimate vacation in our well-appointed condo high in the sky.  Our unit boasts amazing views of the beach and city.  Enjoy sipping your morning coffee or beverage from either of our TWO balconies! Our condo is located in the award-winning Avista Resort, receiving an award for best indoor amenities. ",
        price: 500,
      },
      {
        ownerId: 1,
        address: '666 Evergreen street',
        city: 'Evergreen',
        state: 'CO',
        country: 'United States',
        lat: 50,
        lng: 100,
        name: 'The View~Cozy Oasis at 8510 ft~King Bed ~ Firepit!',
        description: "Experience endless mountain views by staying in the magical 1BR 1Bath cabin, nestled in the mesmerizing setting of the Rocky Mountains. Evergreen, Idaho Springs, ski resorts, hiking and biking trails, lakes, and many outdoor adventures are all nearby and will leave you in awe of their rich natural treasures and fun attractions.",
        price: 300,
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
