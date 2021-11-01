require('newrelic')

const express = require('express')
const app = express()
const AppController = require('./controllers/AppController')
const env = require('./nunjucks')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV !== 'production'
const APP_ROOT = require('path').join(__dirname + '/../')

app.set('port', process.env.PORT)
app.set('env', NODE_ENV)
app.set('json replacer', null)
app.set('json spaces', false)
app.set('view cache', !IS_DEV)
app.set('view engine', 'html')
app.set('views', APP_ROOT + '/views')
app.disable('x-powered-by')

env.express(app)

app.use(express.urlencoded({ extended: false }))
app.use('/', require('./routes'))
app.use(AppController.handleErrors)

module.exports = app
