const WebSocketClient = require('ws')
let EventEmitter
try {
  EventEmitter = require('eventemitter3')
} catch (err) {
  EventEmitter = require('events')
}

class Client extends EventEmitter {
  constructor (fancyToken, fancyOptions) {
    super()

    this.fancyOptions = Object.assign({
      maxShards: 1
    }, fancyOptions)

    this.fancyToken = fancyToken
    this.useragent = 'DiscordBot (https://github.com/WaiifuTech/Mooe)'
    this.presence = {
      game: null,
      status: 'offline'
    }
    this.isAlive = false
    this.heartbeatInterval = 0
    this.botGateway = 'wss://gateway.discord.gg/'
    this.baseURL = 'https://discord.com/api/v6'
  }

  async connect () {
    try {
      if (!this.fancyToken.startsWith('Bot ')) {
        this.fancyToken = 'Bot ' + this.fancyToken
      }
      const ws = new WebSocketClient(this.botGateway)
      const connectJson = {
      		op: 2,
  			d: {
    		token: this.fancyToken,
    		properties: {
      		$os: 'linux',
      		$browser: 'Mooe',
      		$device: 'Mooe'
          }
        }
      }
      const heartJson = {
  			op: 1,
   		    d: 251
 	}
 	function heartbeat () {
  	setInterval(() => {
          ws.send(JSON.stringify(heartJson))
        }, 41250)
      }
      ws.on('open', function open () {
        	ws.send(JSON.stringify(connectJson))
        	heartbeat()
      })
      ws.on('message', function incoming (data) {
  			console.log(data)
      })
    } catch (e) {
    	console.log(e)
    }
  }
}
module.exports = Client
