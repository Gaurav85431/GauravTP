const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');


const authroutes = require('../controllers/auth-controllers')

// const authControllers = require('../controllers/auth-controllers');
const { signupSchema, loginSchema } = require('../validator/auth-validator');

const validate = require('../middleware/validate-middleware')

const LoginSchema = require('../validator/Login-validator');



router.get('/', authroutes.home);


router.route('/register').post(validate(signupSchema), authroutes.register);

// Both login validation work i.e. LoginSchema, loginSchema work

// router.route('/login').post(validate(loginSchema), authroutes.login);
router.route('/login').post(validate(LoginSchema), authroutes.login);


// 
// authMiddleware ka kam hoga ki to check ki bande ne JWT token rakha hai ya nhi.
router.route('/user').get(authMiddleware, authroutes.user);




module.exports = router;