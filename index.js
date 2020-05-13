const Client = require('./lib/Mooe.js')

function Mooe (fancyToken, fancyOptions) {
  return new Client(fancyToken, fancyOptions)
}

Mooe.Client = Client

module.exports = Mooe
