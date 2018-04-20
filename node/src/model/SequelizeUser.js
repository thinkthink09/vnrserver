module.exports = (sequelize, DataTypes) => {
  sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    }
  })
}
