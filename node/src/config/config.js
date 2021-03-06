module.exports = {
  port: process.env.PORT || 3000,

  /*
  sequelize: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    options: {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST
    }
  },
  */
  rethinkdbdash: {
    db: process.env.DB_NAME || 'Training',
    user: process.env.DB_USER || 'rethinkdb',
    password: process.env.DB_PASS || 'rethinkdb',
    servers: [
      {
        host: process.env.DB_HOST || 'XXXX.amazonaws.com',
        port: process.env.DB_PORT || 28015
      }
    ]
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'very nice reuseable server', // secret key
    options: {
      expiresIn: process.env.JWT_EXPIRE || '2 weeks' // two weeks
    }
  }
}
