const express = require('express');
const router = express.Router()

 const controller = require('../controllers/controller');
 const validator = require('../controllers/validation');

 //********** Login Api *************//
router.post('/login',validator.validatelogin,validator.checkValidationResult,controller.login);


//********** Register Api *************//
router.post('/register',validator.validateregister,validator.checkValidationResult,controller.register);


module.exports= router;