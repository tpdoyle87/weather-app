require('dotenv').config()
const request = require('request')

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    encodedAddress = encodeURIComponent(address)
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Opah!! something went wrong. we couldnt connect to the Google servers')
      } else if (body.status === "ZERO_RESULTS") {
        reject('Unable to find that address')
      } else if (body.status === "REQUEST_DENIED") {
        reject(body.error_message)
      } else if (body.status === "OK") {
        resolve({
          Address: body.results[0].formatted_address,
          Latitude: body.results[0].geometry.location.lat,
          Longitude: body.results[0].geometry.location.lng
        });
      }
    });
  })
}

geocodeAddress('19146').then((location) => {
console.log(JSON.stringify(location, undefined, 2))
}).catch((error) => {
  console.log('error', error)
})
