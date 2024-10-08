'use strict';

const { Blog} = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await Blog.bulkCreate([
      { userId: 1,
        title: "Demo of Utter Wellness",
        category: "Mental health and wellness",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
      },
      { userId: 1,
        title: "My Mega Money Management",
        category: "Business and finance",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        userId: 2,
        title: "My Thoughts",
        category: "Personal Reflection",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        userId: 2,
        title: "My Fitness Journey",
        category: "Health and fitness",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        userId: 3,
        title: 'Beautiful Life',
        category: "Personal Reflection",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        userId: 3,
        title: 'Emerging Growth',
        category: "Personal Reflection",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      }
    ], { validate: true });
  },
  

  async down (queryInterface, Sequelize) {
   
    options.tableName = 'Blogs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
    
  }
};
