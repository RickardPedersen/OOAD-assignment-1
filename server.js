const liveServer = require('live-server')

const options = {
	port: 7070,
	root: 'src',
	file: 'src/index.html',
	open: true,
}

liveServer.start(options)
