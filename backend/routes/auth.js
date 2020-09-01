const {Router} = require('express')
const {check} = require('express-validator')
const auth = require('../controllers/auth')
const auth_mdw = require('../middleware/auth.middleware')
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../validators/auth')

const route = Router()

route.post('/signup', [validateSignUpRequest, isRequestValidated], auth.signUp)
route.post('/signin', [validateSignInRequest, isRequestValidated], auth.signIn)

route.post('/profile', auth_mdw, (req, res) => {
    res.status(200).json({ user: 'profile' })
});

module.exports = route