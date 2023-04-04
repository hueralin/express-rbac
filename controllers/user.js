const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

async function register (req, res) {
  const { username, nickname, password } = req.body
  try {
    const user = await UserModel.create({ username, nickname, password })
    res.json({ code: 0, data: user.id, message: '' })
  } catch (err) {
    const message = `create user failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

async function login (req, res) {
  const { username, password } = req.body
  try {
    const user = await UserModel.findOne({ where: { username } })
    if (user && user.password === password) {
      const token = await jwt.sign({ id: user.id, username }, process.env.TOKEN_SECRET)
      res.json({ code: 0, data: token, message: '登录成功' })
    } else {
      res.json({ code: -1, data: null, message: '该用户不存在' })
    }
  } catch (err) {
    const message = `login failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

async function getUserList (req, res) {
  try {
    const userList = await UserModel.findAll()
    res.json({ code: 0, data: userList, message: '' })
  } catch (err) {
    const message = `get user list failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

module.exports = {
  register,
  login,
  getUserList
}
