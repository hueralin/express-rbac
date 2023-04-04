const { DataTypes } = require('sequelize')
const { INTEGER, STRING } = DataTypes
const sequelize = require('../config/mysql')

const ResourceModel = sequelize.define('resource', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  role_name: { type: STRING, allowNull: false },
  c_name: { type: STRING }
}, { freezeTableName: true })

// 同步
ResourceModel.sync().then(() => {
  console.log('ResourceModel sync successfully!')
})

module.exports = ResourceModel
