import Joi from 'joi'

class User {
  constructor({name, email, password}) {
    this.name = name
    this.email = email
    this.password = password
  }
}

User.schema = {
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
}

User.table = 'Users'

export default User
