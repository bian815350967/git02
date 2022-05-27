const express = require('express')
const registerRouter = require('./node/index')

module.exports = {
  devServer: {
    before(app) {
      app.use(express.json())
      registerRouter(app)
    }
  }
}