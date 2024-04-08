const Web3 = require('web3');

module.exports = {
  install: function (Vue, options) {
    let web3;

    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider(options.defaultProvider || "http://localhost:8545"));
    }

    Vue.prototype.$web3 = web3;
  }
}
