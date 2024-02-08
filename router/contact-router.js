const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact-controller')

const validate = require('../middleware/validate-middleware')
const contactSchema = require('../validator/contact-validator');


router.route('/contact').post(validate(contactSchema), contactController.contactForm);

module.exports = router;