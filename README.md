# VNRServer

Welcome to **VNRServer**

This is a server template with:

Frontend: **V** ue.js + Vuex + Webpack +

Backend: **N** ode.js + Express.js + Nodemon +

Database: **R** ethinkDB || Supported DB by Sequelize

This is a prototype of how we're gonna build servers,
in the future we can also use only partials of this project.
For instance using the Backend setup of this project but using React.js for frontend.

I've also included Sequelize, but the example is built up with Rethink.

---

## How to install:

```
vue$ npm install;
node$ npm install;
```

---

## How to start the servers:

```
vue$ npm start;
node$ npm start;
```

---

## Preparing DB:

in your db instance, run the following:

```
r.db('rethinkdb').table('users').insert({id: 'rethinkdb', password: 'rethinkdb'})
r.db('Training').grant('rethinkdb', {read: true, write: true, config: false});
r.db("Training").table("Users").indexCreate("email")
```

we'll work on how we can make the server automatically run those when start up later

---

## Notes:

here's how to setup both environments:

1.  install node.js.

2.  install vue client
    
    ```
    npm install -g vue-cli
    ```

3.  setup webpack project with folder name vue

    ```
    vue init webpack vue
    ```

4.  ask vue init to run npm install, or run it yourself

    ```
    cd vue;
    npm install;
    cd ..;
    ```

5.  setup the backend, make a folder called node and init npm in it

    ```
    mkdir node;
    cd node;
    npm init;
    ```

6.  install nodemon, eslint

    ```
    npm install --save nodemon eslint
    ```

7.  configure eslint

    ```
    ./node_modules/.bin/eslint --init
    ```

8.  install express and other tools

    ```
    npm install --save express cors morgan body-parser
    ```

9.  install babel to be able to compile es7

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

    in config file:

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

    the sample function `getUserWithEmail` returns a promise

    ```
    function getUserWithEmail(email) {
      return r.table(User.table)
      .getAll(email, {index: 'email'}).run(rconn).then((users) => users.next())
    }
    ```

16. add vuetify in vue

    ```
    npm install --save vuetify
    ```

17. to do something like a session storage, first, we install jsonwebtoken

    ```
    npm install --save jsonwebtoken
    ```

    when signing a user token

    ```
    jwt.sign(user, 'secret key', {expiresIn: 60*60*24*7})
    ```

    this returns the token for signed user tokens

18. we install vuex for flux flow, this is similar to redux

    ```
    npm i --save vuex vuex-router-sync
    ```

    in vue main.js, we add vuex-router-sync

    ```
    import { sync } from 'vuex-router-sync'
    import store from './store/store'
    ...
    sync(store, router)
    ...
    new Vue({
      el: '#app',
      router,
      store, // <=== add this
      components: { App },
      template: '<App/>'
    })
    ```

    and through out vue components, you can use

    ```
    this.$store.state
    ```

    or

    ```
    this.$store.dispatch
    ```

19. allowing Vuex to have persistent state:

    ```
    npm i vuex-persistedstate
    ```

    in store.js:

    ```
    import createPersistedState from 'vuex-persistedstate'

    const store = new Vuex.Store({
        // ...
        plugins: [createPersistedState()]
    })
    ```

20. url param, please look at part 6 https://www.youtube.com/watch?v=ipYlztBRpp0

    ```
    export default {
      ...,
      watch: {
        [field] (value) {
          const route = {
            name: [this route name]
          }
          if (this.[field] !== '') {
            route.query = {
              [field]: this.[field]
            }
          }
          this.$router.push(route)
        },
        '$router.query.[field]': {
          immediate: true,
          handler (value) {
            this.[field] = value
          }
        }
      }
    }
    ```

21. using jwt (Json Web Token), or something similar to session, we install on server

    ```
    npm install --save passport passport-jwt
    ```

    in app.js:

    ```
    import passport from 'passport'
    ...
    app.use(passport.initialize())
    ```

    and for vnrserver, we create a UserAuthenticator middleware:

    ```
    import passport from 'passport'
    import {Strategy, ExtractJwt} from 'passport-jwt'
    ...

    passport.use(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ${secret}
        },
        async (jwt_payload, next) => {
            try {
                // validate jwt_payload is a user
                next(null, user)

            } catch (err) {
                next(new Error(err.message), false)
            }
        })
    )

    export function AuthenticateUser (req, res, next) {\
        passport.authenticate('jwt', (err, user) => {
            if (err || !user) {
                res.status(403)
                return res.json('api access forbidden')
            }
            req.user = user
            next()
        })(req, res, next)
    }
    ...
    ```

22. db connection pooling, we use rethinkdbdash

    ```
    npm install --save rethinkdbdash
    ```

    we add a connector file, or in vnrserver, we call it rethinkdbPool.js

    ```
    import rethinkdbdash from 'rethinkdbdash'
    import config from './config/config'

    const r = rethinkdbdash(config.rethinkdbdash)

    module.exports = r
    ```

    we replace all `import r from 'rethinkdb'` to

    ```
    import r from '${path to rethinkdbPool.js}'
    ```

    we don't need to do `run(conn)` or `.then((users) => users.toArray()))` anymore.

23. testing:
