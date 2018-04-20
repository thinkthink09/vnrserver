import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../config/config'

const db = {}
if(config.sequelize) {
  const sequelize = new Sequelize(config.sequelize)

  fs.readdirSync(__dirname)
    .filter((file) =>
      file.startsWith('Sequelize')
    )
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file))
      db[model.name] = model
    })

  db.sequelize = sequelize
}
db.Sequelize = Sequelize

module.exports = db
