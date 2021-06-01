console.clear();
const httpro = require('./src/httpro.js');

httpro.config({
  baseUrl: 'https://jsonplaceholder.typicode.com'
});

httpro
  .get('/comments')
  .query({
    postId: 1
  })
  .exec()
  .then(response => {
    console.log(response);
  });
