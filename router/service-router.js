const express = require('express');
const servicesController = require('../controllers/service-controller');
const router = express.Router();

router.get('/service', servicesController.services);


module.exports = router;
