const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const sndrsp = require("../../utils/sendResponse")
const {appconst} = require("../../core")

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';


// Load client secrets from a local file.


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listEvents(auth) {
    // console.log("Inside List Events")
    const calendar = google.calendar({version: 'v3', auth});
    // console.log("Test1")
    return new Promise((resolve, reject) => {
      calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 1,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, res) => {
        if(err) reject(err);
        else {
            // console.log(res.data.items)
          resolve(res.data.items)
        }
      })
  
    });
  }
async function getData(fileName) {
      return new Promise((resolve, reject) => {
          fs.readFile(fileName, (err, data) => {
              if(err) reject(err)
              else resolve(data)
          })
      })
  }


async function getCalendarEvents(callback) {
    events = [];
    await getData('credentials.json')
    .then((content) => {
        // console.log(content)
        authorize(JSON.parse(content), (auth) => {
            console.log("Authorised")
            var listPromise = listEvents(auth)
            listPromise.then((events) => {
                // console.log(events)
                callback(null, events);
            }, (err) => {
                callback(err, null);
            })
        })

    })
}

module.exports.upcomingEvents = async function(req,res, next) {
    await getCalendarEvents((err, events) => {
        if(err) {
            message = `Error Occured while retriving your calendar`
        }
        else {
            upcomingtrip = []
            // console.log(events)
            events.forEach((event) => {
            if(event.summary.search("Flights to") === 0)
                {
                    location = event.summary.substr("Flight to ".length)
                    upcomingtrip.push({"location" : location, "date" : event.start.dateTime})
                }
            })

            message = `Okay. Let me have a quick scan on your calendar.`
            if(upcomingtrip.length > 1) {
                message += `Yeah. I see, ${upcomingtrip.length} upcoming trips. your appointments are `
                for(i=0;i<upcomingtrip.length;i++) {
                    message += `on ${upcomingtrip[i].date} at ${upcomingtrip[i].location} `
                }
                message += `. Could you please confirm which one is it ? `
            }
            else if(upcomingtrip.length === 1) {
                message += `Yeah. I see, ${upcomingtrip.length} upcoming trip. your appointment is`
                tripDate = new Date(upcomingtrip[0].date)
                message += ` on ${tripDate.getDate()}th ${appconst.getMonth(tripDate)} to ${upcomingtrip[0].location}`
                message += ` Could you please confirm it?`
            }
            else {
                message += `No Upcoming Trips`
            }
            console.log(message); 
        // }    
        
        let responseJson = {
            "payload" : {
                "google" : {
            expectUserResponse: true,
            richResponse: {
                "items": [ {
                    "simpleResponse": {
                        "textToSpeech": message
                    }
                },
                {
                    "basicCard": {
                        "title": appconst.title,
                        "formattedText": message,
                        "image": {
                            "url": appconst.imageUrl,
                            "accessibilityText": appconst.accessibilityText
                        },
                        "buttons": [
                            {
                                "title": appconst.buttonTitle,
                                "openUrlAction": {
                                    "url": appconst.buttonUrl
                                }
                            }
                        ]

                    }
                }                    
                ]
            },
            outputContexts: [
                {
                    "name": req.body.session+"/contexts/product_input",
                    "lifespan": 1,
                    "parameters": 
                    {
                        "location": upcomingtrip[0].location,
                        "date": tripDate.getDate() + "th " + appconst.getMonth(tripDate),
                        "productname": "sunscreen"
                    }
                }
            ],
         
          session: req.body.session
          }
        }
    }
          res.status(200).send(responseJson)
        //   return res.json(sndrsp.sendResponse(message, "V2"/*version*/, next));

        // res.status(200).send(message);
}
    });
    
}
