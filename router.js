const express = require('express')
const router = express.Router()
const userCtr = require('./controllers/user')
const roleCtr = require('./controllers/role')
const resourceCtl = require('./controllers/resource')
const authentication = require('./middlewares/authentication')

// 注册 & 登录
router.post('/api/register', userCtr.register)
router.post('/api/login', userCtr.login)

// 用户相关
router.get('/api/user', authentication, userCtr.getUserList)
router.post('/api/user', authentication, userCtr.createUser)
router.put('/api/user', authentication, userCtr.updateUser)
router.delete('/api/user', authentication, userCtr.deleteUser)

// 角色相关
router.get('/api/role', authentication, roleCtr.getRoleList)
router.post('/api/role', authentication, roleCtr.createRole)
router.put('/api/role', authentication, roleCtr.updateRole)
router.delete('/api/role', authentication, roleCtr.deleteRole)

// 资源相关
router.get('/api/resource', authentication, resourceCtl.getResourceList)
router.post('/api/resource', authentication, resourceCtl.createResource)
router.put('/api/resource', authentication, resourceCtl.updateResource)
router.delete('/api/resource', authentication, resourceCtl.deleteResource)

module.exports = router
