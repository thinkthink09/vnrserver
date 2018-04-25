import Joi from 'joi'
import bcrypt from 'bcrypt-nodejs'

class User {
  constructor({name, email, password}) {
    this.name = name
    this.email = email
    this.password = password
  }

  data() {
    return {
      name: this.name,
      email: this.email,
      password: this.password
    }
  }

  hashPassword() {
    // let salt = bcrypt.genSaltSync()
    this.password = bcrypt.hashSync(this.password, null)
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
}

User.schema = {
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
}

User.table = 'Users'

export default User
