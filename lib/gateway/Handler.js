const WebSocket = require('ws')
const EventEmitter = require('eventemitter3')
const Holders = require('../util/Holders.js')
const ws = new WebSocket(Holders.GATEWAY_URL)

class GatewayHandler extends EventEmitter {
 	constructor (client) {
 		super()

 		this._client = client
 	}

 	connect () {
 		try {
  		const connectJSON = {
        op: 2,
  			d: {
    		token: this._client.fancyToken,
    		properties: {
      		$os: 'linux',
      		$browser: 'Mooe',
      		$device: 'Mooe'
          }
        }
      }
 			function heartbeat () {
  			setInterval(() => {
          	ws.send(JSON.stringify(Holders.heartbeatJson))
        }, 41250)
      }
 			ws.on('open', function open () {
        	ws.send(JSON.stringify(connectJSON))
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
module.exports = GatewayHandler
