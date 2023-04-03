const jwt = require('jsonwebtoken')

async function authentication(req, res, next) {
    const token = req.headers.authorization
    try {
        const userInfo = await jwt.verify(token, process.env.TOKEN_SECRET)
        req.userInfo = userInfo
        next()
    } catch (err) {
        res.json({ code: -1, data: null, message: '用户名或密码错误' })
    }
}

module.exports = authentication
