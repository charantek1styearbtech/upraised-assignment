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

const updateGadget = async (name, { status }) => {
    const gadget = await Gadgets.findOne({where:{name}});
    if (!gadget) {
        return null;
    }

    gadget.status = status;
    gadget.decommissionedAt= null;
    await gadget.save();
    return gadget;
};

const decommissionGadget = async (name) => {
    const gadget = await Gadgets.findOne({where:{name}});
    if (!gadget) {
        return null;
    }

    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadget.save();
    return gadget;
};

const selfDestructGadget = async (id) => {
    const gadget = await Gadgets.findByPk(id);
    if (!gadget) {
        return null;
    }

    if (gadget.status === 'Destroyed' || gadget.status === 'Decommissioned') {
        throw new Error('Gadget is already destroyed or decommissioned');
    }

    gadget.status = 'Destroyed';
    await gadget.save();
    return gadget;
};

module.exports = {
    createGadget,
    updateGadget,
    decommissionGadget,
    selfDestructGadget
};