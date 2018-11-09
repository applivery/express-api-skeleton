const debug = require('debug')('AP:Index')
const app = require('./server/app')
const { port, env } = require('./server/setup//vars')

app.listen(port, () => {
  debug(`Server API running in http://localhost:${port} (${env})`)
})
