const express = require('express');
const router = express.Router();
const authUser = require('../middleware/user.auth');
const { getGadget, addGadget, updateGadget, deleteGadget, selfDestructGadget } = require('../controller/gadgets.controller');

router.get('/', authUser, getGadget);
router.post('/', authUser, addGadget);
router.patch('/', authUser, updateGadget);  // Update gadget status
router.delete('/', authUser, deleteGadget); // Decommission gadget
router.post('/:id/self-destruct', authUser, selfDestructGadget);  // New endpoint

module.exports = router;