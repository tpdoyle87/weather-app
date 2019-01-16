const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b)
      } else {
        reject('arguments must be numbers')
      }
    }, 1500)
  })
}
asyncAdd(5, "5").then((result) => {
  console.log('outer Result: ', result)
  return asyncAdd(result, 5)
}).then((result) => {
  console.log('Should be 15: ', result)
}).catch((errorMessage) => {
  console.log('error: ', errorMessage)
})

// const somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hey it worked!')
//     reject('Hey it broke :((((')
//   }, 3000);
// });

// somePromise.then((message) => {
//   console.log('success:', message)
// }, (e) => {
//   console.log('Error: ', e)
// })
