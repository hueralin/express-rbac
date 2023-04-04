const { DataTypes } = require('sequelize')
const { INTEGER } = DataTypes
const sequelize = require('../config/mysql')
const UserModel = require('../models/user')
const RoleModel = require('../models/role')

const UserRoleModel = sequelize.define('user_role', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: INTEGER, references: { model: UserModel, key: 'id' } },
  role_id: { type: INTEGER, references: { model: RoleModel, key: 'id' } }
}, { freezeTableName: true })

// 多对多关系
UserModel.belongsToMany(RoleModel, { through: UserRoleModel })
RoleModel.belongsToMany(UserModel, { through: UserRoleModel })

// 同步
UserRoleModel.sync().then(() => {
  console.log('UserRoleModel sync successfully!')
})

module.exports = UserRoleModel
