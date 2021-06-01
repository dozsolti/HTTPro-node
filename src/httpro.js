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
    const _httpro = new HTTPro();
    _httpro.request = new HTTProRequest({
      method: 'GET',
      url,
      ignoreBaseUrl
    });

    return _httpro;
  }
  post(url, ignoreBaseUrl = false) {
    const _httpro = new HTTPro();
    _httpro.request = new HTTProRequest({
      method: 'POST',
      url,
      ignoreBaseUrl
    });

    return _httpro;
  }

  params(params) {
    this.request.updateParams(params);
    return this;
  }

  query(queries) {
    this.request.updateQueries(queries);
    return this;
  }
  body(body) {
    this.request.updateBody(body);
    return this;
  }

  map(mapFunc) {
    this.request.updateMapFunc(mapFunc);
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
