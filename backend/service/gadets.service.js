const Gadgets = require('../models/gadget.model');
const {v4: uuidv4} = require('uuid');

const createGadget = async ({name, status}) => {
    try{
        if (!name || !status) {
        throw new Error('All Fields are Required');
        }
    const existingGadget=await Gadgets.findOne({where:{name,status}});
    if(existingGadget)
    {
        throw new Error('Gadget with Status already Exists');
    }
    const gadget=await Gadgets.create({
        name,status
    });
    return gadget;
    }
    catch(error)
    {
        throw (error);
    }
};

module.exports = {
    createGadget
};