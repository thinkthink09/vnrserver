import passport from 'passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import r from '../../rethinkdbPool'
import Joi from 'joi'
import config from '../../config/config'
import User from '../../model/User'

passport.use(
  new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  },
  async (jwt_payload, next) => {
    try {
      if (!jwt_payload.id ||
          Joi.validate(jwt_payload.name, User.schema.name).error !== null ||
          Joi.validate(jwt_payload.email, User.schema.email).error !== null
        ) {
          throw new Error('invalid jwt token')
      }

      let user = await getUser(jwt_payload.id)
      next(null, user)

    } catch (err) {
      console.log('invalid payload received', jwt_payload)
      next(new Error(err.message), false)
    }
  })
)

export function AuthenticateUser (req, res, next) {
  passport.authenticate('jwt', (err, user) => {
    if (err || !user) {
      res.status(403)
      return res.json('api access forbidden')
    }
    req.user = user
    next()
  })(req, res, next)
}

function getUser(id) {
  return r.table(User.table).get(id)
}
