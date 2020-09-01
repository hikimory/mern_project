const {Router} = require('express')
const auth = require('../../controllers/admin/auth')
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../../validators/auth')

const route = Router()

route.post('/admin/signup', [validateSignUpRequest, isRequestValidated], auth.signUp)
route.post('/admin/signin', [validateSignInRequest, isRequestValidated], auth.signIn)

module.exports = route