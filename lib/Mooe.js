const WebSocketClient = require('ws')
const EventEmitter = require('eventemitter3')
const GatewayHandler = require('./gateway/Handler.js')

class Client extends EventEmitter {
  constructor (fancyToken, fancyOptions) {
    super()

    this.fancyOptions = Object.assign({
      maxShards: 1
    }, fancyOptions)

    this.fancyToken = fancyToken
    this.gateway = new GatewayHandler(this)
    this.useragent = 'DiscordBot (https://github.com/WaiifuTech/Mooe)'
    this.presence = {
      game: null,
      status: 'offline'
    }
  }

  async connect () {
    try {
      if (!this.fancyToken.startsWith('Bot ')) {
        this.fancyToken = 'Bot ' + this.fancyToken
      }
      this.gateway.connect()
    } catch (e) {
    	console.log(e)
    }
  }
}
module.exports = Client
