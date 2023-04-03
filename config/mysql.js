const { Sequelize } = require('sequelize')
const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
})

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('MySQL connect successfully!')
    } catch (err) {
        console.error(`MySQL connect failed: ${err.message}!`)
    }
}

testConnection()

module.exports = sequelize
