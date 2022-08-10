const normalizer = require('./transforms/normalizer');
const restclient = require('nordic/restclient')({
  timeout: 5000,
  baseURL: 'https://api.mercadolibre.com'
});

class IntegracionService { 
}

module.exports = IntegracionService;
