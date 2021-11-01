'use strict'

const debug = require('debug')('storefront:controller:home')
const newrelic = require('newrelic')

const HomeController = {
  index(request, response, next) {
    newrelic.setTransactionName('index')

    response.render('index', {
      title: 'Home title'
    })
  }
}

module.exports = HomeController
