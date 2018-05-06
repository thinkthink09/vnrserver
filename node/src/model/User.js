import Joi from 'joi'
import bcrypt from 'bcrypt-nodejs'

class User {
  constructor({id, name, email, password}) {
    if(id) {
      this.id = id
    }
    this.name = name
    this.email = email
    this.password = password
  }

  data() {
    return {
      id: this.id,
      name: this.name,
      email: this.email
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
  id: Joi.any().optional(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
}

User.table = 'Users'

export default User
