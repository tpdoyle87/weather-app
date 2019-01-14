const request = require('request')

const fetchWeather = (coordinates) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coordinates.Latitude},${coordinates.Longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(body.currently.temperature)
    } else {
      console.log('Darksky server error')
    }
  })
}

module.exports = {
  fetchWeather
}
