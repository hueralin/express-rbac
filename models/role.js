const { DataTypes } = require('sequelize')
const { INTEGER, STRING } = DataTypes
const sequelize = require('../config/mysql')

const RoleModel = sequelize.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_name: { type: STRING, allowNull: false },
    c_name: { type: STRING },
}, { freezeTableName: true })

// 同步
RoleModel.sync().then(() => {
    console.log('RoleModel sync successfully!')
})

module.exports = RoleModel
