const { check, validationResult } = require('express-validator')

exports.validateSignUpRequest = [
    check('firstName', 'firstName is required').notEmpty(),
    check('lastName', 'lastName is required').notEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimum password length 6 characters').isLength({ min: 6})
]

exports.validateSignInRequest = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimum password length 6 characters').isLength({ min: 6})
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
        
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(), //[0].msg
            message: 'Incorrect registration data'
        })
    }

    next()
}