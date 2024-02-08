const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware')


// -------
// USER
// -------
router.get('/users', authMiddleware, adminController.getAllUsers);

// delete the user
// hm check krenge ki user login kiya  hia ya nhi, wo admin hai ya nahi
router.delete('/users/delete/:id', authMiddleware, adminMiddleware, adminController.deleteUserById);


// get the user for update
router.get('/users/:id', authMiddleware, adminMiddleware, adminController.getUserById)

// update the user
router.patch('/users/update/:id', authMiddleware, adminMiddleware, adminController.updateUserById);


// -------
// CONTACT
// -------


// router.get('/contacts', adminController.getAllContacts);
router.get('/contacts', authMiddleware, adminMiddleware, adminController.getAllContacts);



// admin hia to login hoker (own)
// each message has its own unique id.
router.delete('/contacts/delete/:id', authMiddleware, adminMiddleware, adminController.deleteContactById)
// chuki rooute hi different hai contact/delete/id aur user/delete/id ka to same function hia deleteUserById to isse koi farq nhi padega.

module.exports = router;