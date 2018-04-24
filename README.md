# VNRServer

Welcome to **VNRServer**

This is a server template with:

Frontend: **V** ue.js + Webpack +

Backend: **N** ode.js + Express.js +

Database: **R** ethinkDB

This is a prototype of how we're gonna build servers,
in the future we can also use only partials of this project.
For instance using the Backend setup of this project but using React.js for frontend.

---

## How to start the servers:

```
vue$ npm start;
node$ npm start;
```

---

## Notes:

here's how to setup both environments:

1. install node.js.

2. install vue client
```
npm install -g vue-cli
```
3. setup webpack project with folder name vue
```
vue init webpack vue
```
4. ask vue init to run npm install, or run it yourself
```
cd vue;
npm install;
cd ..;
```
5. setup the backend, make a folder called node and init npm in it
```
mkdir node;
cd node;
npm init;
```
6. install nodemon, eslint
```
npm install --save nodemon eslint
```
7. configure eslint
```
./node_modules/.bin/eslint --init
```
8. install express and other tools
```
npm install --save express cors morgan body-parser
```
9. install babel to be able to compile es7
```
npm install --save-dev babel-cli
npm install --save-dev babel-preset-env
```
10. setup package.json, setup these scripts:
```
    "scripts": {
      "babel-node": "babel-node src/app.js",
      "dev": "./node_modules/.bin/nodemon --exec 'npm run lint && npm run babel-node'",
      "start": "npm run dev",
      "lint": "./node_modules/.bin/eslint **/*.js"
    }
```
11. setup eslint, install the extensions
```
npm install --save-dev eslint-config-airbnb-base eslint-config-standard eslint-plugin-node eslint-plugin-promise eslint-plugin-standard
```
in .eslintrc.js
```
    module.exports = {
      extends: [
        "airbnb-base",
        "standard"
      ]
    }
```
12. use axios for http requests from frontend
```
npm install --save axios
```
then do
```
axios.get('/user', {id: 123})
```
to send a get requests

13. to setup sequelize
create a models file
```
    import Sequelize from 'sequelize'
    import config from '../config'
    import User from './SequeslizeUser'
    ...

    const db = {}
    if(config.db) {
      const sequelize = new Sequelize(config.db)

      db['User'] = User
      ...

      db.sequelize = sequelize
    }
    db.Sequelize = Sequelize

    module.exports = db
```
in app.js
```
import { sequelize } from './model/models'
...
sequelize.sync().then(startServer)
...
```
in config file
```
    db: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      options: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST
      }
    }
```
14. to set up rethinkdb, install by
```
npm install --save rethinkdb
```
in config file
```
    rethinkdb: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      db: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    }
```
in app.js
```
    r.connect(config.rethinkdb).then((conn) => {
      app.rethinkConn = conn
    }).then(startServer)
```
15. using rethinkdb, you need to async/await a lot
```
    UserController.post('/get-user', async (req, res) => {
      res.json(await getUserWithEmail(email))
    })
```
the function `getUserWithEmail` need async as well
```
    async function getUserWithEmail(email) {
      return await r.table(User.table)
      .getAll(email, {index: 'email'}).run(rconn).then((users) => users.next())
    }
```
16. add vuetify in vue
```
npm install --save vuetify
```


My current progress is https://youtu.be/xZMwg5z5VGk?t=14m13s
