const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

// 注册
async function register (req, res) {
  try {
    const { username, nickname, password } = req.body
    const user = await UserModel.findOne({ where: { username } })
    if (user) {
      res.json({ code: -1, data: null, message: '用户名已存在' })
      return
    }
    const newUser = await UserModel.create({ username, nickname, password })
    const token = await jwt.sign({ id: newUser.id, username }, process.env.TOKEN_SECRET)
    res.json({ code: 0, data: token, message: '' })
  } catch (err) {
    const message = `register user failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 登录
async function login (req, res) {
  try {
    const { username, password } = req.body
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

// 获取用户列表
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

// 创建用户
async function createUser (req, res) {
  try {
    const { username, nickname, password } = req.body
    const user = await UserModel.findOne({ where: { username } })
    if (user) {
      res.json({ code: -1, data: null, message: '用户名已存在' })
      return
    }
    const newUser = await UserModel.create({ username, nickname, password })
    res.json({ code: 0, data: newUser.id, message: '' })
  } catch (err) {
    const message = `create user failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 更新用户
async function updateUser (req, res) {
  try {
    const { id, nickname } = req.body
    const rows = await UserModel.update({ nickname }, { where: { id } })
    if (rows > 0) {
      res.json({ code: 0, data: null, message: '更新用户成功' })
    } else {
      res.json({ code: 0, data: null, message: '用户不存在' })
    }
  } catch (err) {
    const message = `update user failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 删除用户
async function deleteUser (req, res) {
  try {
    const { id } = req.query
    const rows = await UserModel.destroy({ where: { id } })
    if (rows > 0) {
      res.json({ code: 0, data: null, message: '删除成功' })
    } else {
      res.json({ code: -1, data: null, message: '用户不存在' })
    }
  } catch (err) {
    const message = `delete user failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

module.exports = {
  register,
  login,
  getUserList,
  createUser,
  updateUser,
  deleteUser
}
