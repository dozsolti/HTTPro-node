const { URL } = require('url');
const { configs } = require('./httpro.config.js');

module.exports = class HTTProRequest {
  _url = '';
  method = '';

  _headers = {};
  params = null;
  query = {};
  body = {};
  files = {};

  mapFunc = null;

  constructor(options) {
    // TODO: validations
    if (!options.url || !options.method) {
      console.error(
        'HTTProRequest: url and method are required at initialization'
      );
      return;
    }

    this.method = options.method;

    this._url = `${configs.baseUrl}${options.url}`;
    if (options.ignoreBaseUrl) {
      this._url = options.url;
    }

    this._headers = options.headers || {};
    this.params = options.params || null;
    this.query = options.query || {};
    this.body = options.body || {};
    this.files = options.files || {};
  }

  get url() {
    let url = new URL(this._url + this.paramsAsString);

    for (let key in this.query) {
      let value = '' + this.query[key];
      url.searchParams.append(key, value);
    }
    return url.href;
  }
  get headers() {
    const extraHeaders = {};
    console.log('httproRequest.method: ', this.method);

    if (this.method != 'GET') {
      if (this.files == null || Object.keys(this.files).length == 0)
        extraHeaders['Content-Type'] = 'application/json';
      else extraHeaders['Content-Type'] = 'multipart/form-data';
    }
    return {
      ...this._headers,
      ...extraHeaders
    };
  }
  updateParams(params) {
    this.params = params;
  }

  updateQueries(query) {
    this.query = {
      ...this.query,
      ...query
    };
  }

  updateBody(body) {
    this.body = {
      ...this.body,
      ...body
    };
  }

  updateMapFunc(mapFunc) {
    if (typeof mapFunc != 'function') {
      console.error('Error in HTTProRequest: mapFunc is not a function');
      return;
    }
    this.mapFunc = mapFunc;
  }
  get paramsAsString() {
    if (this.params == null) return '';

    if (Array.isArray(this.params)) return '/' + this.params.join('/');

    if (typeof this.params === 'object')
      return `/${JSON.stringify(this.params)}`;

    return `/${this.params}`;
  }
};
