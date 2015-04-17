var Ajax = require('simple-ajax'),
    _ = require('lodash');

var urlToStores = 'http://localhost:8002/backend_mock/stores.json';

var filterStores = function(stores, param) {
    var param = param || '';
    return _.filter(stores, (store) => {
        var storeAddress = store.Address.toLowerCase();
        return _.contains(storeAddress, param.toLowerCase());
    });
};

module.exports = function(param) {
    return new Promise(function(resolve, reject) {
        var ajax = new Ajax(urlToStores);
        ajax.on('success', function(event) {
            if (event && event.target && event.target.response) {
                var response = JSON.parse(event.target.response);
                resolve(filterStores(response.Results, param));
            } else {
                reject();
            }
        });
        ajax.on('error', function() {
            reject();
        });
        ajax.send();
    });
};