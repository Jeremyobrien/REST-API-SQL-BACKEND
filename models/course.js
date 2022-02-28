'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
//User Model
module.exports = (sequelize) => {
  class Course extends Model {};
  Course.init({
    title:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:"Please enter a title"
        }
      }
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:"Please enter author's name"
        }
      }
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
    userId:{
        type: DataTypes.NUMBER,
    }
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.associate = (models) => {
      Course.belongsTo(models.User)
  }


  return Course;
}