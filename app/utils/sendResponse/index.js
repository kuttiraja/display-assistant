// Function to send correctly formatted responses to Dialogflow which are then sent to the user
var sendResponse = function(responseToUser, version,  next) {
    let responseJson = {};
    // if the response is a string send it as a response to the user
  //   if (typeof responseToUser === 'string') {

  //     if (version === 'V2'){
  //       responseJson.fulfillmentText = responseToUser;
  //       console.log('Conversation Engine Response : ' + responseJson.fulfillmentText);
  //     }else{
  //       responseJson.speech = responseToUser; // spoken response
  //       responseJson.displayText = responseToUser; // displayed response
  //       responseJson.queryResult = responseToUser;
  //       console.log('Conversation Engine Response : ' + responseJson.speech);
  //     }
  //     return responseJson;
  //     next();

  //   } else {

  //     if (version === 'V2'){

  //       let outputContextlst =[];
  //       let context = {};

  //       responseToUser.outputContexts.forEach(function(entry) {
  //         let name= (entry.name === undefined || entry.name == '') ? '' : responseToUser.session +'/contexts/'+entry.name; 
  //         context = {'name': name,
  //                     'lifespanCount':entry.lifespan, 
  //                     'parameters':entry.parameters,
  //                     // 'resetContexts':entry.resetContexts|false
  //                   };

  //          outputContextlst.push(context);
  //     });

  //        responseJson = {
  //          'outputContexts': outputContextlst,
  //          'fulfillmentText' : responseToUser.speech
  //         };
  //     }
  //     else{
  //       responseJson.speech = responseToUser.speech || responseToUser.displayText;
  //       responseJson.displayText = responseToUser.displayText || responseToUser.speech;

  //       responseJson.contextOut = responseToUser.outputContexts;
  //       responseJson.queryResult = responseToUser.queryResult;
  //     }
  // }
   responseJson = {
    "payload": {
      "google": {
        "expectUserResponse": true,
        "systemIntent": {
          "intent": "actions.intent.OPTION",
          "data": {
            "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
            "carouselSelect": {
              "items": [
                {
                  "optionInfo": {
                    "key": "SELECTION_KEY_ONE",
                    "synonyms": [
                      "synonym 1",
                      "synonym 2",
                      "synonym 3"
                    ]
                  },
                  "description": "This is a description of a carousel item.",
                  "image": {
                    "url": "IMG_URL_AOG.com",
                    "accessibilityText": "Image alternate text"
                  },
                  "title": "Title of First Carousel Item"
                },
                {
                  "optionInfo": {
                    "key": "SELECTION_KEY_GOOGLE_HOME",
                    "synonyms": [
                      "Google Home Assistant",
                      "Assistant on the Google Home"
                    ]
                  },
                  "description": "Google Home is a voice-activated speaker powered by the Google Assistant.",
                  "image": {
                    "url": "IMG_URL_GOOGLE_HOME.com",
                    "accessibilityText": "Google Home"
                  },
                  "title": "Google Home"
                },
                {
                  "optionInfo": {
                    "key": "SELECTION_KEY_GOOGLE_PIXEL",
                    "synonyms": [
                      "Google Pixel XL",
                      "Pixel",
                      "Pixel XL"
                    ]
                  },
                  "description": "Pixel. Phone by Google.",
                  "image": {
                    "url": "IMG_URL_GOOGLE_PIXEL.com",
                    "accessibilityText": "Google Pixel"
                  },
                  "title": "Google Pixel"
                }
              ]
            }
          }
        },
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "This is a carousel example."
              }
            }
          ]
        }
      }
    }
  }
  
  console.log('Conversation Engine Response : ' + JSON.stringify(responseJson,undefined,2));
  return responseJson;
  next();

}

module.exports.sendResponse=sendResponse;