const Sequelize = require('sequelize')
const sequelize = new Sequelize('jc-treinamentos', 'root', 'admin', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

module.exports = sequelize