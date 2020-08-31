const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config')

const signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: 'This user already exists'})
        }

        const user = new User({ 
            firstName, 
            lastName, 
            email, 
            password,
            username: Math.random().toString()
        })

        await user.save()

        res.status(201).json({ message: 'User created'})


    } catch (e) {
        console.log('Error', e.message)
        res.status(500).json({message: 'Something went wrong, try again'})
    }
}

const signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: 'User is not found'})
        }

        if(user.authenticate(password)){
            const token = jwt.sign({_id: user._id}, config.JWT_SECRET, { expiresIn: '1h' })
            const { _id, firstName, lastName, email, role, fullName } = user
            res.status(200).json({
                token,
                user: {_id, firstName, lastName, email, role, fullName}
            })
        }else{
            return res.status(400).json({
                message: 'Invalid Password'
            })
        }

    } catch (e) {
        console.log('Error', e.message)
        res.status(500).json({message: 'Something went wrong, try again'})
    }
}

module.exports = {
    signUp,
    signIn
}