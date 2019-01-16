require('dotenv').config();

const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
  .options({
    a: {
      demand: false,
      alias: "address",
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  const defaultAddress = (address = null) => {
     if (address !== null) {
      return address
    } else {
      return "San Francisco"
    }
  }

const encodedAddress = encodeURIComponent(defaultAddress(argv.address))
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`
axios.get(geocodeURL).then((response) => {
  if (response.data.status === "ZERO_RESULTS") {
    throw new Error('Unable to find that address')
  }
  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  const weatherURL = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${lng}`
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherURL).then((response) => {
    const temp = response.data.currently.temperature
    const actualTemp = response.data.currently.apparentTemperature
    console.log(`It's currently ${temp}, but it feels like ${actualTemp}`)
  })
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to the api server')
  } else {
    console.log(error.message)
  }
})
