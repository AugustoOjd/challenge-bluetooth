const {request, response} = require('express')
const {userService} = require('../services/user.service')

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
    req.session.user = email
    const cookie = req.cookies     
    try {
        const user = await userService.loginUser(email, password)
        // console.log(session)
        // console.log(cookie)
        return res.status(200).json({
            status: 'Success',
            payload: {
                name: user[0].firstName,
                email: user[0].email,
                state: user[0].state,
            }
        })
    } catch (error) {
        return res.json({error})
    }
}

const getUser = async (req = request, res=response)=>{
    try {
        console.log(req.session.user)
        res.send('ok')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    userRegister,
    userLogin,
    getUser
}