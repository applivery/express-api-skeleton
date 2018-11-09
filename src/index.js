const debug = require('debug')('AP:Index')
const app = require('./app/app')
const { port, env } = require('./app/setup//vars')

app.listen(port, () => {
  debug(`Server API running in http://localhost:${port} (${env})`)
})
