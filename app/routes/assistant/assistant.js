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
                        // "fulfillmentText" : "This is sample text",
                        "fulfillmentMessages": [
                          {
                            "card": {
                              "title": "card title",
                              "subtitle": "card text",
                              "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                              "buttons": [
                                {
                                  "text": "button text",
                                  "postback": "https://assistant.google.com/"
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

