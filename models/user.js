'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
//User Model
module.exports = (sequelize) => {
  class User extends Model {};
  User.init({
    firstName:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:"Please enter a title"
        }
      }
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:"Please enter author's name"
        }
      }
    },
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (models) => {
      User.hasMany(models.Course);
  };

  return User;
}