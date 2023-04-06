const RoleModel = require('../models/role')

// 获取角色列表
async function getRoleList (req, res) {
  try {
    const roleList = await RoleModel.findAll()
    res.json({ code: 0, data: roleList, message: '' })
  } catch (err) {
    const message = `get role list failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 创建角色
async function createRole (req, res) {
  try {
    const { roleName, roleCname } = req.body
    const role = await RoleModel.findOne({ where: { role_name: roleName } })
    if (role) {
      res.json({ code: -1, data: null, message: '角色已存在' })
      return
    }
    const newRole = await RoleModel.create({ role_name: roleName, role_cname: roleCname })
    res.json({ code: 0, data: newRole.id, message: '角色创建成功' })
  } catch (err) {
    const message = `create role failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 更新角色
async function updateRole (req, res) {
  try {
    const { id, roleCname } = req.body
    const rows = await RoleModel.update({ role_cname: roleCname }, { where: { id } })
    if (rows > 0) {
      res.json({ code: 0, data: null, message: '更新角色成功' })
    } else {
      res.json({ code: -1, data: null, message: '角色不存在' })
    }
  } catch (err) {
    const message = `update role failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 删除角色
async function deleteRole (req, res) {
  try {
    const { id } = req.query
    const rows = await RoleModel.destroy({ where: { id } })
    if (rows > 0) {
      res.json({ code: 0, data: null, message: '删除角色成功' })
    } else {
      res.json({ code: -1, data: null, message: '角色不存在' })
    }
  } catch (err) {
    const message = `delete role failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

module.exports = {
  getRoleList,
  createRole,
  updateRole,
  deleteRole
}
