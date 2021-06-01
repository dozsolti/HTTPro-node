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

    const request = https.request(
      httproRequest.fullURL,
      options,
      response => {
        response.setEncoding('utf8');
        response.on('data', d => {
          resolve(JSON.parse(d));
        });
      }
    );

    request.on('error', error => reject(error));

    if (httproRequest.method != 'GET') {
      request.write(JSON.stringify(httproRequest.body));
    }
    request.end();
  });
};

module.exports = {
  createRequest,
  execRequest
};
