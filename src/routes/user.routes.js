const Router = require('express')
const { userRegister, userLogin, getUser } = require('../controllers/user.controller')

const router = Router()

router.post('/register', userRegister)

router.post('/login', userLogin)

router.get('/session', getUser)

module.exports = router