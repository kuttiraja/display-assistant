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
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "This is BE Json Response"
              }
            },
            {
              "basicCard": {
                "title": "Walbot",
                "formattedText": "This is BE Json Response",
                "image": {
                  "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPpL4bGSmEIPeiXi7afYDK9sRfhsK5ERPLlzkKyroqhuNQ-g",
                  "accessibilityText": "Bot"
                },
                "buttons": [
                  {
                    "title": "walmart",
                    "openUrlAction": {
                      "url": "http://walmart.com"
                    }
                  }
                ]

              }
            }
          ]
        },
        "contextOut": [
          {
            "name": "3_trip_confirmation-followup",
            "lifespan": 2,
            "parameters": {
              "location": "Florida",
              "date": "5th May"
            }
          }
        ]

      }
    }
  }
  
  console.log('Conversation Engine Response : ' + JSON.stringify(responseJson,undefined,2));
  return responseJson;
  next();

}

module.exports.sendResponse=sendResponse;
