module.exports.BODY_TYPES = Object.freeze({ JSON: 0, FORMDATA: 1 });

module.exports.configs = {
  baseUrl: '',
  logTheError: true,
  messages: {
    loading: 'Loading...',
    empty: 'No results',
    generalError: 'Something went wrong, please try again later',
    errors: {
      '404': 'Not found'
    }
  },
  update: function(_configs) {
    for (let key in _configs) this[key] = _configs[key];
  }
};
