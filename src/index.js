const debug = require('debug')('AP:Index')
const app = require('./server/app')

const port = 8082
app.listen(port, () => {
  debug(`Server API running in http://localhost:${port}`)
})
