const {check,validationResult} = require('express-validator');

const {matchedData, sanitize} = require('express-validator');

module.exports.checkValidationResult = checkValidationResult; 


//****** Function that validate express-validator results ******//
function checkValidationResult(req, res, next) {
    var result = validationResult(req)
    console.log(result)
    if (!result.isEmpty()) {
        // response.createResponse(res, 400,result.array()[0].msg,{}, {}); //response.createResponse is a method of general/MyResponse
        res.status(400).json({
            status: "fail",
            message: result.array()[0].msg

        })
    } else {
        next(); //go ahead if request is valid
    }
}



//*********  Register validation **********// 


module.exports.validateregister = [

  //********* First Name Validation **********//
    check("first_name")
    .isLength({min:3,max:10})
    .withMessage('First Name should be minimum 3 character and maximum 10 character')
    .matches('[a-zA-Z]*')
    .withMessage('First Name should be only Alphabet'),

    //********* Last Name Validation **********//

    check("last_name").isAlpha().withMessage('LAST_NAME MUST HAVE CHARACTERS ONLY'),


    //********* Email Validation **********//
 

    check("email")
    .isLength({ min: 1 })
    .withMessage('Email required')
    .isEmail()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage('INVALID_EMAIL'),


    //********* Phone number Validation **********//

    check("phone")
    .isLength({min:10,max:16})
    .withMessage('PHONE_NUMBER MUST BE 10 DIGIT')
    .notEmpty().withMessage('PHONE_NUMBER CONTAIN ONLY NUMERIC'),


    //********* Password  Validation **********//

    check("password")
    .isLength({ min: 8 })
    .withMessage('PASSWORD_LENGTH_MIN_IS_6_MAX_15')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Atleast one lowercase letters, uppercase letters, numbers and symbols to make the password really strong!'),



//********* Confirm Password Validation **********//

    check("confirmpassword")
    // .isLength({ min: 8, max: 15 })
    // .withMessage('CONFIRM_PASSWORD_REQUIRED')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('PASSWOD_AND_CONFIRM_PASSWORD_NOT_SAME');
      } else {
        return true;
      }
    }),
];






//************* Login Validation *****************//


module.exports.validatelogin = [
    check("email")
    .isLength({ min: 1 })
    .withMessage('Email required')
    .isEmail()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage('INVALID_EMAIL'),
  check("password")
    .isLength({ min: 6, max: 15 })
    .withMessage('PASSWORD_LENGTH_MIN_IS_6_MAX_15')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/)
    .withMessage('Atleast one lowercase letters, uppercase letters, numbers and symbols to make the password really strong! '),
];
