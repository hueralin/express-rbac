const { DataTypes } = require('sequelize')
const { INTEGER, STRING } = DataTypes
const sequelize = require('../config/mysql')

const UserModel = sequelize.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: STRING, allowNull: false },
    nickname: { type: STRING },
    password: { type: STRING, allowNull: false },
}, { freezeTableName: true })

// 同步
UserModel.sync().then(() => {
    console.log('UserModel sync successfully!')
})

module.exports = UserModel
