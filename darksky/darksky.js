const request = require('request')

const fetchWeather = (coordinates, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coordinates.Latitude},${coordinates.Longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        actualTemp: body.currently.apparentTemperature
      })
    } else {
      callback('Darksky server error')
    }
  })
}

module.exports = {
  fetchWeather
}
