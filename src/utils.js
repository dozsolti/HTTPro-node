const https = require('https');

const execRequest = httproRequest => {
  return execNodeRequest(httproRequest);
};

const execNodeRequest = httproRequest => {
  return new Promise((resolve, reject) => {
    const options = {
      method: httproRequest.method,
      headers: httproRequest.headers
    };

    console.log('httproRequest.fullURL: ', httproRequest.url);
    console.log('httproRequest.body: ', httproRequest.body);
    console.log('httproRequest.headers: ', httproRequest.headers);

    const request = https.request(httproRequest.url, options, response => {
      response.setEncoding('utf8');
      response.on('data', d => {
        let result = JSON.parse(d);
        if (httproRequest.mapFunc) {
          result = httproRequest.mapFunc(result);
        }
        resolve(result);
      });
    });

    request.on('error', error => reject(error));

    if (httproRequest.method != 'GET') {
      request.write(JSON.stringify(httproRequest.body));
    }
    request.end();
  });
};

module.exports = {
  execRequest
};
