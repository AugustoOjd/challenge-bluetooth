const {request, response} = require('express')
const {userService} = require('../services/user.service')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { User } = require('../models/User.model')
dotenv.config()

const userRegister = async (req = request, res=response)=>{

    const {firstName, lastName, email, password} = req.body

    try {
        const user = await userService.registerUser(firstName, lastName, email, password)

        return res.status(201).json({
            status: 'Success',
            payload: user
        })
    } catch (error) {
        return res.json({error})
    }
}

const userLogin = async (req = request, res=response)=>{

    const { email, password} = req.body
    
    try {
        const {user, token} = await userService.loginUser(email, password)
        return res.status(200).json({
            status: 'Success',
            payload: {
                user,
                token
            }
        })
    } catch (error) {
        return res.json({error})
    }
}

const getUser = async (req = request, res=response)=>{

    const token = req.cookies
    try {

        console.log(token)
        const user = jwt.verify(token, process.env.JWT_KEY)

        const validUser = await User.findall({
            where: {
                email: user
            }
        })
        
        res.status(200).json({
            user: validUser[0].email,
            token: token
        })
    } catch (error) {
        res.status(404).json({
            error: 'Token error'
        })
    }
}

module.exports = {
    userRegister,
    userLogin,
    getUser
}