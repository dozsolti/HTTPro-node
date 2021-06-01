const { configs, BODY_TYPES } = require('./httpro.config.js');
const HTTProRequest = require('./httpro.request.js');
const utils = require('./utils.js');

class HTTPro {
  request = null;

  constructor() {
    this.request = null;
  }

  config(config) {
    configs.update(config);
  }

  get(url, ignoreBaseUrl = false) {
    this.request = new HTTProRequest({
      method: 'GET',
      url,
      ignoreBaseUrl
    });

    return this;
  }

  query(queryParams) {
    this.request.queryParams = {
      ...this.request.queryParams,
      ...queryParams
    };
    return this;
  }

  exec() {
    return new Promise((resolve, reject) => {
      // TODO: validations
      utils.execRequest(this.request).then(resolve);
    });
  }
}
module.exports = new HTTPro();
