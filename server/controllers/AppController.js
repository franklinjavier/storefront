'use strict'

const debug = require('debug')('storefront:controller:app')
const newrelic = require('newrelic')

const isProd = process.env.NODE_ENV === 'production'

const AppController = {
  health(request, response) {
    newrelic.setTransactionName('getHealth')

    response.json({
      status: 'OK',
      pid: process.pid,
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      env: process.env.NODE_ENV,
      host: request.get('host'),
      hostname: request.hostname,
      version: process.version,
      headersHost: request.headers.host,
      userAgent: request.headers['user-agent']
    })
  },
  handleErrors(err, request, response, _next) {
    const status = err.status || err.response || 500

    const message = {
      err: err.message,
      url: request.url,
      status,
      store: (request.store || {}).id,
      data: (err.response || {}).data || {},
      ...(status === 500 && { stack: err.stack }),
      ...(request.method !== 'GET' && { body: request.body })
    }

    if (![204, 404, 409].includes(status)) {
      if (status < 500) {
        debug('warn', message)
        // logger.log('warn', message)
      } else {
        debug('app.error', message)
        // logger.error('app.error', message)
      }
    }

    response
      .status(status)
      .json(
        !isProd && message.stack ? JSON.stringify(message.stack) : message.data
      )
  }
}

module.exports = AppController
