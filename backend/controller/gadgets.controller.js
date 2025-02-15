const Gadgets = require('../models/gadget.model');
const {validationResult} = require('express-validator');
const gadgetService = require('../service/gadets.service');

const gadgetNames = [
    "The Nightingale",
    "The Kraken",
    "Shadow Walker",
    "Phoenix Eye",
    "Dragon's Breath",
    "The Sentinel",
    "Ghost Protocol",
    "The Chimera",
    "Thunderbolt",
    "The Spectre",
    "Hydra's Fang",
    "The Oracle",
    "Titan's Grip",
    "The Valkyrie",
    "Storm Breaker"
];

const getRandomGadgetName = () => {
    const randomIndex = Math.floor(Math.random() * gadgetNames.length);
    return gadgetNames[randomIndex];
};

const getGadget = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        const { status } = req.query;
        console.log(status);
        if (status) {
            const gadgets = await gadgetService.getByStatus(status);
            if (!gadgets || gadgets.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No Gadgets with the specified status found"
                });
            }
            return res.status(200).json({
                success: true,
                data: gadgets
            });
        }
        const gadgets = await Gadgets.findAll();
        if (!gadgets || gadgets.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No gadgets found'
            });
        }
        const modifiedGadgets = gadgets.map(gadget => {
            const successProbability = Math.floor(Math.random() * 101);
            return {
                ...gadget.dataValues,
                name: `${gadget.dataValues.name} - (${successProbability}% Success Probability)`
            };
        });

        res.status(200).json({
            success: true,
            data: modifiedGadgets
        });
    } catch (error) {
        console.error('Error fetching gadgets:', error);
        return res.status(400).json({
            success: false,
            message: 'Error fetching gadgets',
            error: error.message
        });
    }
};

const addGadget = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        const name = getRandomGadgetName();
        const status = 'Available';
        const gadget = await gadgetService.createGadget({
            name,
            status
        });
        return res.status(200).json({
            success: true,
            message: 'Gadget created successfully',
            data: gadget
        });
    } catch (error) {
        console.error('Error creating gadget:', error);
        return res.status(400).json({
            success: false,
            message: 'Error creating gadget',
            error: error.message
        });
    }
};

const updateGadget = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        const { name, status } = req.body;
        const validStatuses = ['Available', 'Deployed', 'Destroyed', 'Decommissioned'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
            });
        }
        const updatedGadget = await gadgetService.updateGadget(name, { status });
        if (!updatedGadget) {
            return res.status(404).json({
                success: false,
                message: 'Gadget not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Gadget updated successfully',
            data: updatedGadget
        });
    } catch (error) {
        console.error('Error updating gadget:', error);
        return res.status(400).json({
            success: false,
            message: 'Error updating gadget',
            error: error.message
        });
    }
};

const deleteGadget = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        const { name } = req.body;
        const decommissionedGadget = await gadgetService.decommissionGadget(name);
        
        if (!decommissionedGadget) {
            return res.status(404).json({
                success: false,
                message: 'Gadget not found or already decommissioned',
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Gadget decommissioned successfully',
            data: decommissionedGadget
        });

    } catch (error) {
        console.error('Error decommissioning gadget:', error);
        return res.status(400).json({
            success: false,
            message: 'Error decommissioning gadget',
            error: error.message
        });
    }
};

const generateConfirmationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const selfDestructGadget = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        const { id } = req.params;
        const { confirmationCode } = req.body;

        if (!confirmationCode) {
            const expectedCode = generateConfirmationCode();
            req.session.confirmationCode = expectedCode;
            
            return res.status(200).json({
                success: true,
                message: 'Self-destruct sequence requires confirmation',
                confirmationCode: expectedCode,
                instructions: 'Please confirm self-destruct by sending this code back'
            });
        }
        if (confirmationCode !== req.session.confirmationCode) {
            return res.status(400).json({
                success: false,
                message: 'Invalid confirmation code'
            });
        }
        delete req.session?.confirmationCode;
        const destroyedGadget = await gadgetService.selfDestructGadget(id);
        if (!destroyedGadget) {
            return res.status(404).json({
                success: false,
                message: 'Gadget not found for self-destruct'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Gadget self-destruct sequence completed',
            data: destroyedGadget
        });

    } catch (error) {
        console.error('Error in self-destruct sequence:', error);
        return res.status(400).json({
            success: false,
            message: 'Error in self-destruct sequence',
            error: error.message
        });
    }
};

module.exports = {
    getGadget,
    addGadget,
    updateGadget,
    deleteGadget,
    selfDestructGadget
};


