'use strict'

const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer({ secure: false });
const serverNP = 'https://mb.np.my....cz' // TUTO Dopln server (ten mb.np.my....cz)
var morgan = require('morgan')

var logger = morgan('dev')

app.use(logger)

app.post('/de05/joyBasket/v1/finishedOrders/*', function (req, res) {
	res.status(409)
	res.setHeader('Content-Type', 'application/json')

	const responseSlotNotAvailable = `{
  "errorCode": "SLOT_NOT_AVAILABLE",
  "errorMessage": "Some message"
}`

	// TUTO Zmen
	const response = responseSlotNotAvailable
	console.log(response)

	res.send(response)
})

app.all('*', function (req, res) {
	console.log('proxying to '+serverNP);
    apiProxy.web(req, res, {target: serverNP});
})

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}
const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log('server running at ' + port)
})
