//const { logger, config } = require('../../core')
const request = require('request');

async function getWeather(cityName, callback){

        console.log('city: ', cityName);

  let apiKey = '621a3c61529ce62de1168dfe20a718cb';
 
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`

  let weatherResponse;

  console.log('url', url);

  await request(url, function (err, response, body) {
    if (err) {
      console.log('error:', err);
      callback(err);
    } else {
      console.log('body:', body);
      weatherResponse = JSON.parse(body);
      let message = `It's ${weatherResponse.main.temp} degrees in ${weatherResponse.name}!`;
      console.log('message', message);
      callback(message);
    }
  });
}

module.exports =  getWeather

