const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            // split function returns an array so the token is at index [1]
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded =jwt.verify(token, process.env.JWT_SECRET)

            // get user from token
            // .select('-password') this will exculde the password taken from the User model
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
})


module.exports = {protect}