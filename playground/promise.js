const somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hey it worked!')
    reject('Hey it broke :((((')
  }, 3000);
});

somePromise.then((message) => {
  console.log('success:', message)
}, (e) => {
  console.log('Error: ', e)
})
