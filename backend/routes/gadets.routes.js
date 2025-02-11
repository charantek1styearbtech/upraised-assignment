const express = require('express');
const router = express.Router();
const authUser = require('../middleware/user.auth');
const { getGadget,addGadget} = require('../controller/gadgets.controller');

// Protected route - requires valid JWT token
router.get('/', authUser, getGadget);
router.post('/',authUser, addGadget);
//router.patch('/',authUser,gadgetsController.patchGadget);
//router.delete('/',authUser,gadgetsController.deleteGadget);

module.exports = router;