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

const responseSlotNotAvailable = `{
  "errorCode": "SLOT_NOT_AVAILABLE",
  "errorMessage": "Some message"
}`

const responseRohlikOrderFailed = `{
  "errorCode": "ROHLIK_ORDER_FAILED",
  "errorMessage": "Some message"
}`

const responseUnavailableProduct = `{
  "errorCode": "UNAVAILABLE_PRODUCT",
  "errorMessage": "Some message"
}`

const responseUnknownAddress = `{
  "errorCode": "UNKNOWN_ADDRESS",
  "errorMessage": "Some message"
}`

const responseUnreachableAddress = `{
  "errorCode": "UNREACHABLE_ADDRESS",
  "errorMessage": "Some message"
}`

app.use(morgan('dev'))

// Finish Order
app.post('/de05/joyBasket/v1/finishedOrders/*', function (req, res) {
	res.status(409)
	res.setHeader('Content-Type', 'application/json')

	// TUTO Zmen
	const response = responseSlotNotAvailable
	console.log(response)

	res.send(response)
})

// Send Order
app.put('/de05/joyBasket/v1/finishedOrders/*', function (req, res) {
	res.status(409)
	res.setHeader('Content-Type', 'application/json')

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
