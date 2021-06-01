console.clear();
console.log();
console.log();
const httpro = require('./src/httpro.js');

httpro.config({
  baseUrl: 'https://reqres.in/api'
});

function testGet(userId) {
  return httpro
    .get('/users')
    .params(userId)
    .exec();
}
function testPost() {
  return httpro
    .post('/users')
    .body({ name: 'morpheus' })
    .body({ job: 'leader' })
    .exec();
}

testPost().then(responsePost => {
  console.log('responsePost: ', responsePost);
});
