const {CustomError} = require('../errors/customErrors')
const {User} = require('../models/User.model')
const { Op } = require("sequelize");

class UserService {
    constructor(){

    }

    async registerUser(firstName, lastName, email, password){
        try {
            
            if(!firstName || !lastName || !email || !password) throw new CustomError('credentials require', 404, 'credentials error', false)

            if(password.length <= 4 || password.length >= 6) throw new CustomError('password at least 4 characters', 404, 'password error', false )
            
            const alreadyUser = await User.findAll({
                where: {
                    email: email
                }
            })

            if(alreadyUser) throw new CustomError('user already exists', 404, 'user exists', false)

            const user = await User.create({firstName, lastName, email, password})
            user.save()
            
            return user
        } catch (error) {
            throw error
        }
    }

    async loginUser(email, password){
        try {
            if(!email || !password) throw new CustomError('both credentials are require', 404, 'credentials error', false)

            const validUser = await User.findAll({
                where: {
                    [Op.and]: [
                      { email: email },
                      { password: password }
                    ]
                  }
            })

            if(validUser.length <= 0) throw new CustomError('invalid credentials', 404, 'credentials error', false)
            
            return validUser

        } catch (error) {
            throw error
        }
    }

}

const userService = new UserService()

module.exports = {
    userService
}