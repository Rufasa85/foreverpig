const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pig extends Model {}

Pig.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    },
    dob:{
        type:DataTypes.DATE,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    isRaised:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    farmerPickupRequested:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }, 
    caretakerPickupRequested:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }, 


},{
    sequelize
});

module.exports=Pig