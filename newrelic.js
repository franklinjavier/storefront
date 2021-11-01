'use strict'

exports.config = {
  app_name: ['cdn-dev'],
  agent_enabled: false,
  license_key: '23424242',
  apdex_t: 4,
  logging: {
    level: 'error'
  },
  error_collector: {
    enabled: true,
    ignore_status_codes: [404]
  }
}
