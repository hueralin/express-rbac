const express = require('express')
const router = express.Router()
const userCtr = require('./controllers/user')
const authentication = require('./middlewares/authentication')

router.post('/api/register', userCtr.register)
router.post('/api/login', userCtr.login)
router.get('/api/user', authentication, userCtr.getUserList)

module.exports = router
