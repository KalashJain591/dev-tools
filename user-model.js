const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const User = db.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
  age:{
    type: DataTypes.INTEGER
  },
  phone:{
    type: DataTypes.STRING,
    validate: {
      len: [10, 10]
    }
  }
}, {
  
});

module.exports = User;