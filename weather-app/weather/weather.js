const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/2b2d43a5b0fa0340c7fbc1e8b5794263/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: convertToCelcius(body.currently.temperature),
        apparentTemperature: convertToCelcius(body.currently.apparentTemperature)
      });
    }
  });
};

var convertToCelcius = (temperature) => {
  return (temperature - 32) * 5 / 9;
}

module.exports.getWeather = getWeather;
