const Gadgets=require('../models/gadget.model');
const User=require('../models/users.model');
const {v4: uuidv4}=require('uuid');
module.exports.createGadget= async ({name,status})=>{
    if (!name | !status)
    {
        throw new Error('All Fields are Required');
    }
    const gadget=await new Gadgets.create({
        id:uuidv4(),
        name:name,
        status:status
    });
}

module.exports.createUser= async({name,email,password})=>{
    if(!name| !email | !password)
    {
        throw new Error('All Fields are Required');
    }
    const user=await User.create({
        id:uuidv4,
        name:name,
        email:email,
        password:hashedPassword
    });
}