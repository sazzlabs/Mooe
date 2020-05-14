const Holders = require('../util/Holders')

class Channel {
	constructor(client, data) {
		super(data.id)

		this.channeltype = data.type
		this._client = client
		switch(data.type) {
			case Holders.ChannelTypes.TEXT: {
				return new TextChannel(client, data)
			}
		}
	}
}