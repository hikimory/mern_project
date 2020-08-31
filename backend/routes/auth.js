const {Router} = require('express')
const auth = require('../controllers/auth')
const auth_mdw = require('../middleware/auth.middleware')

const route = Router()

route.post('/signup', auth.signUp)
route.post('/signin', auth.signIn)

route.post('/profile', auth_mdw, (req, res) => {
    res.status(200).json({ user: 'profile' })
});

module.exports = route