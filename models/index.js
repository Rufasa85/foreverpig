const Caretaker = require("./Caretaker")
const Farmer = require("./Farmer")
const Pig = require("./Pig")
const Tag = require("./Tag")

Farmer.hasMany(Pig,{
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
})
Pig.belongsTo(Farmer)

Caretaker.hasMany(Pig)
Pig.belongsTo(Caretaker)

Pig.belongsToMany(Tag,{
    through:"PigsTags"
})

Tag.belongsToMany(Pig,{
    through:"PigsTags"
})

module.exports = {
    Caretaker,
    Farmer,
    Pig,
    Tag,
}