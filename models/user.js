'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
//User Model
module.exports = (sequelize) => {
  class User extends Model {};
  User.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:"Please enter a 'first name'"
        }
      }
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:"Please enter a 'last name'"
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
      User.hasMany(models.Course, {
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
  };

  return User;
}