require('dotenv').config()

const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./darksky/darksky')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage)
    } else {
      weather.fetchWeather(results, (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage)
        } else {
          console.log(`Currently it's ${weatherResults.temperature} degrees, but it feels like ${weatherResults.actualTemp} in ${results.Address}`)
        }
      })
    };
  })


