const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Caretaker extends Model {}

Caretaker.init(
  {
    // add properites here, ex:
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8],
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    lng: {
      type: DataTypes.FLOAT,
    },
    numPigs:{
        type:DataTypes.INTEGER,
        defaultValue:1
    }
  },
  {
    sequelize,
    hooks:{
      beforeCreate: userObj=>{
        userObj.password = bcrypt.hashSync(userObj.password,5);
        return userObj
      }
    }
  }
);

module.exports = Caretaker;
