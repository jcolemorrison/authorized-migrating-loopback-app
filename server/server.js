'use strict'

const loopback = require('loopback')
const boot = require('loopback-boot')

const app = module.exports = loopback()

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started')
    const baseUrl = app.get('url').replace(/\/$/, '')
    console.log('---')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
}

const bootOptions = {
  appRootDir: __dirname,
  bootDirs: [`${__dirname}/boot/migrations`],
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, bootOptions, function (err) {
  if (err) throw err

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start()
})
