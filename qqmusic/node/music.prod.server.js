const express = require('express')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const csrf = require('xsrf')
const registerRouter = require('./index.js')

const port = process.env.PORT || 7781

const app = express()

const csrfProtection = csrf({
  cookie: true,
  ignoreMethods: ['HEAD', 'OPTIONS'],
  checkPathReg: /^\/api/
})
app.use(cookieParser())
app.use(csrfProtection)
app.use(express.json())

app.get('/', function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  return next()
})

registerRouter(app)

app.use(compression())

app.use(express.static('./dist'))

app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next()
  }

  // handle CSRF token errors here
  res.status(403)
  res.send('<p>403</p>')
})

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
