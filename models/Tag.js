const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model {}

Tag.init({
    // add properites here, ex:
    tag: {
         type: DataTypes.STRING,
         unique:true
    }
},{
    sequelize
});

module.exports=Tag