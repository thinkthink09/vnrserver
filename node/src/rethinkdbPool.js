import rethinkdbdash from 'rethinkdbdash'
import config from './config/config'

const r = rethinkdbdash(config.rethinkdbdash)

module.exports = r
