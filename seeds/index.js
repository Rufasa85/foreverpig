const sequelize = require("../config/connection");
const {Caretaker,Farmer,Pig,Tag} = require("../models")

const farmers = [
     {
        email:"Dale@iluvpigs.edu",
        password:"pigspigs",
        city:"Everett",
        lat:47.9790,
        lng: -122.2021
     },
     {
        email:"Ginny@iluvpigs.edu",
        password:"pigspigs!",
        city:"Enumclaw",
        lat:47.8790,
        lng: -122.1021
     }
]
const caretakers = [
     {
        email:"Joe@iluvpigs.edu",
        password:"password",
        city:"Seattle",
        lat:47.4790,
        lng: -122.0021
     },
     {
        email:"Gabe@iluvpigs.edu",
        password:"gabegabe!",
        city:"Seattle",
        lat:47.3790,
        lng: -122.2021
     }
]

const pigs = [
    {
       name:"Oinker",
       dob:new Date(),
       description:"A total sweetie great with cats and dogs, she will melt your heart",
       FarmerId:1
    },
    {
       name:"Snortz",
       dob:new Date(),
       description:"Kind of spicy but ok if only animal around",
       FarmerId:1
    }
]

const tags = [
    {
       tag:"good with kids"
    },
    {
       tag:"advanced care"
    }
]

const seedMe =async()=>{
    await sequelize.sync({force:true});
    await Farmer.bulkCreate(farmers,{individualHooks:true});
    await Caretaker.bulkCreate(caretakers,{individualHooks:true});
    const pigObj = await Pig.bulkCreate(pigs);
    const tagObj = await Tag.bulkCreate(tags);
    console.log("seeding complete!")
    const firstPig = pigObj[0]
    const firstTag = tagObj[0];
    await firstTag.addPig(2)
    await firstPig.addTags([1,2])
    process.exit(0);
}

seedMe();