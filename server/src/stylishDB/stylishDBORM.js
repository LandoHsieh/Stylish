import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host, 
    port: process.env.port,
    dialect: 'mysql'
})
