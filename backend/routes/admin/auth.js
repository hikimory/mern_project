const {Router} = require('express')
const auth = require('../../controllers/admin/auth')

const route = Router()

route.post('/admin/signup', auth.signUp)
route.post('/admin/signin', auth.signIn)

module.exports = route