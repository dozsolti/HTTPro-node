const { URL } = require('url');
const { configs } = require('./httpro.config.js');

module.exports = class HTTProRequest {
  url = '';
  method = '';
  queryParams = {};
  headers = {};

  constructor(options) {
    // TODO: validations
    if (!options.url || !options.method) {
      console.error(
        'HTTProRequest: url and method are required at initialization'
      );
      return;
    }

    this.method = options.method;

    this.url = `${configs.baseUrl}${options.url}`;
    if (options.ignoreBaseUrl) {
      this.url = options.url;
    }

    this.queryParams = options.queryParams || {};
  }

  get fullURL() {
    const url = new URL(this.url);

    for (let key in this.queryParams) {
      let value = '' + this.queryParams[key];
      url.searchParams.append(key, value);
    }
    return url.href;
  }
};
