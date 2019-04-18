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
                            "textToSpeech": "This is a basic card example."
                        }
                    },
                    {
                        "basicCard": {
                            "title": "Appointment Details",
                            "subtitle": "Calendar Scan",
                            "formattedText": "Okay. Let me have a quick scan on your calendar. Yeah. I see 2 upcoming trips. An appointment on May 1st   at Florida and another on May 5th at Houston. Could you please confirm which one is it ? ",
                            "image": {
                                "url": "https://miro.medium.com/max/1394/1*50rG5q86I99_o1vGGTying.png",
                                "accessibilityText": "Image alternate text"
                            },
                            "buttons": [
                                {
                                    "title": "This is a button",
                                    "openUrlAction": {
                                        "url": "https://assistant.google.com/"
                                    }
                                }
                            ],
                            "imageDisplayOptions": "CROPPED"
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
