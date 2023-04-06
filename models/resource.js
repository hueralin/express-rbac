const { DataTypes } = require('sequelize')
const { INTEGER, STRING } = DataTypes
const sequelize = require('../config/mysql')

const ResourceModel = sequelize.define('resource', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  // 资源英文名
  resource_name: { type: STRING, allowNull: false },
  // 资源中文名
  resource_cname: { type: STRING },
  // 资源类型：1 接口路由，2 页面路由，3 按钮(操作)
  resource_type: { type: INTEGER, allowNull: false },
  // 资源值：页面路由、接口路由、按钮标识
  resource_value: { type: STRING, allowNull: false },
  // 资源权限状态：0 未启用，1 启用
  status: { type: INTEGER, defaultValue: 1 }
}, { freezeTableName: true })

// 同步
ResourceModel.sync().then(() => {
  console.log('ResourceModel sync successfully!')
})

module.exports = ResourceModel
