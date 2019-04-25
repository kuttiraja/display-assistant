//const { logger, config } = require('../../core')
const calendar = require('../../utils/calendar')
const sndrsp = require("../../utils/sendResponse")
const getWeather = require('../../utils/weather')
const Product = require('../../utils/Product')

async function getHandler(req, res, next) {
        await calendar.upcomingEvents(req, res, next);
        // res.send(200).send("Hello World")    
}

async function postHandler(req, res, next) {
        console.log('request: ', req.body);
        
        // if("product" === req.body.queryResult.action) {
                responseJson = {
                        "fulfillmentText" : "This is sample text",
                        "fulfillmentMessages": [{
                          "platform": "ACTIONS_ON_GOOGLE",
                          "simpleResponses": {
                              "simpleResponses": [{
                                  "textToSpeech": "Hi! How are you doing?"
                              }]
                          }
                      },
                          {
                            "platform": "ACTIONS_ON_GOOGLE",
        "carouselSelect": {
		"title": "Trips",
          "items": [
            {
              "info": {
                "key": "India trip"
              },
              "title": "Trip to India",
              "description": "on 3rd May",
              "image": {
                "imageUri": "https://lh3.googleusercontent.com/Yf-YApid5GDv-f1AqHqGyCqpTE_YSBuVXgjnbEBBDAAPRInugJ8_0nSWkfVs6veB11M",
                "accessibilityText": "Google Flights"
              }
            },
            {
              "info": {
                "key": "Florida Trip"
              },
              "title": "Trip to Florida",
              "description": "on 4th June",
              "image": {
                "imageUri": "https://cdn2.vectorstock.com/i/1000x1000/18/91/blue-cruise-ship-symbol-logo-vector-21351891.jpg",
                "accessibilityText": "Cruise Trip"
              }
            }
          ]
        }
                          }
                        ],
                        "outputContexts": [
                          {
                            "name": req.body.session + "/contexts/product_input",
                            "lifespanCount": 1,
                            "parameters": {
                              "location": "florida",
                              "date" : "10th May",
                              "product" : "sunscreen"
                            }
                          }
                        ]
                        // "followupEventInput": {
                        //   "name": "product_input",
                        //   "languageCode": "en-US",
                        //   "parameters": {
                        //     "location": "param value"
                        //   }
                        // }
                      }
        // }
        res.status(200).send(responseJson);
        // await calendar.upcomingEvents(req, res, next);
        
        // action = req.body.action
        // parameters = req.body.parameters 

        // if(action === 'Product') {
        //         return calendar.getCalendarEvents(req, res, next)
        // }
        // if(action === 'Recommendations') {
        //         return Product.getRecommendations(req, res, next)
        // }
        // else {
        //         let responseJson = {
        //                 speech: localeService.translate('I didn\'t get that. Can you say it again?'),
        //                 outputContexts: [{ 'name': 'start_login', 'lifespan': 1, 'parameters': {} }],
        //                 session: req.body.session
        //                 };
        //               return res.json(sndrsp.sendResponse( responseJson ));
        // }

        // res.status(200).send('hello World!!! Post Request')
}


module.exports = { 
	getHandler,
	postHandler
}

