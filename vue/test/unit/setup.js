// setup JSDOM
require('jsdom-global')()

// make expect available globally
global.expect = require('expect')

const localVue = require('@vue/test-utils').createLocalVue()

localVue.use(require('vuetify'))
localVue.use(require('vue-router'))
localVue.use(require('vuex'))

global.localVue = localVue
