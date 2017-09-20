'use strict'

const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer({ secure: false, changeOrigin: true });
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

const responseAvailableAlternatives = `{
	"result": "UNAVAILABLE_PRODUCT",
	"address": {
		"id": 14785,
		"full": "Dejvická 316/15, Praha 16000"
	},
	"availableProducts": [{
			"id": 207,
			"name": "Bezlepková makronka",
			"description": "Vypálená nejprestižnějšího vystřídalo nádorovité nějaké ho čtvrti posly nunavut netopýrům dá a kůži typy už sněžných vysokých vlivů dospělého a světových starověkého.",
			"productDetail": "Test",
			"mainPictureName": "macaron_v2.png",
			"pictureNames": ["macaron_other_v3.png"],
			"price": 89
		},
		{
			"id": 113,
			"name": "Domácí destilační zařízení",
			"description": "Větvích v chování křižovatkách ságy o vzhledu.",
			"productDetail": "Test",
			"mainPictureName": "alcohol_v1.png",
			"pictureNames": ["alcohol_other_v2.png"],
			"price": 3499
		}
	]
}`

app.use(morgan('dev'))


// Availability
// app.get('/te00/joyBasket/v1/availability*', function (req, res) {
// 	res.status(200)
// 	res.setHeader('Content-Type', 'application/json')

// 	// TUTO Zmen
// 	const response = responseUnknownAddress
// 	console.log(response)

// 	res.send(response)
// })

// // Finish Order
// app.post('/te00/joyBasket/v1/finishedOrders/*', function (req, res) {
// 	res.status(409)
// 	res.setHeader('Content-Type', 'application/json')

// 	// TUTO Zmen
// 	const response = responseUnreachableAddress
// 	console.log(response)

// 	res.send(response)
// })

// // Send Order
app.put('/te00/joyBasket/v1/finishedOrders/*', function (req, res) {
	res.status(409)
	res.setHeader('Content-Type', 'application/json')

	// TUTO Zmen
	const response = responseUnavailableProduct
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
