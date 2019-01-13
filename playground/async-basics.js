console.log('starting app')

setTimeout(() => {
  console.log('inside of callback timeout occured')
}, 3000);

setTimeout(() => {
  console.log('second timeout works')
}, 0)

console.log('finishing up')
