'use strict'
const join = require('path').join

module.exports = function (options) {
  return function sslRedirection (req, res, next) {
    const env = process.env.NODE_ENV
    if (env === 'staging' || env === 'production') {
      if (req.headers['x-forwarded-proto'] === 'https') return next()
      return res.redirect(301, `https://${join(req.hostname, req.url)}`)
    }
    next()
  }
}
