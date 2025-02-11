const Gadgets = require('../models/gadget.model');
const {validationResult} = require('express-validator');
const gadgetService = require('../service/gadets.service');
// Array of cool gadget names
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
            return res.status(400).json({message: errors.array()});
        }

        const gadgets = await Gadgets.findAll();
        
        if (!gadgets || gadgets.length === 0) {
            return res.status(404).json({message: 'No gadgets found'});
        }

        // Add random names and success probability
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
        res.status(500).json({
            success: false,
            message: 'Error fetching gadgets',
            error: error.message
        });
    }
};

const addGadget = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()});
        }

        const name = getRandomGadgetName();
        // New gadgets always start as Available
        const status = 'Available';

        const gadget = await gadgetService.createGadget({
            name,
            status
        });

        return res.status(201).json({
            success: true,
            message: 'Gadget created successfully',
            data: gadget
        });

    } catch (error) {
        console.error('Error creating gadget:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating gadget',
            error: error.message
        });
    }
};

module.exports = {
    getGadget,
    addGadget
};


