const express = require('express')
const router = express.Router()
const userCtr = require('./controllers/user')
const authentication = require('./middlewares/authentication')

// user
router.post('/register', userCtr.register)
router.post('/login', userCtr.login)
router.get('/user', authentication, userCtr.getUserList)

module.exports = router
