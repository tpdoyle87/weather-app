const request = require('request');

const geocodeAddress = (address, callback) => {
  encodedAddress = encodeURIComponent(address)
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Opah!! something went wrong. we couldnt connect to the Google servers')
    } else if (body.status === "ZERO_RESULTS") {
      callback('Unable to find that address')
    } else if (body.status === "OK") {
      callback(undefined, {
        Address: body.results[0].formatted_address,
        Latitude: body.results[0].geometry.location.lat,
        Longitude: body.results[0].geometry.location.lng
      });
    }
  });
}

module.exports = {
  geocodeAddress
}

