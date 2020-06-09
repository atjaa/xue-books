'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MYHTTP: '"http://"',
  MYGOOPORT: '":8082"',
  MYPYTHONPORT: '":8080"'
})
