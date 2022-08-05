const router = require('nordic/ragnar').router();
const Service = require('../services/productsService');

/**
 * Ejercitación 1
 * 
 * Aquí deberás crear el endpoint con el método GET, el cual consuma
 * el servicio que devuelve los productos de la API de MeLi.
 * 
 * Comando para correr el test: `npm run test:unit:watch get-products`
 */

router.get('/', (req, res) => {
    const { name, limit } = req.query; // query es una propiedad propia de express
    const { siteId } = req.platform; // platform es una propiedad que se le agrega al objeto req gracias a ragnar (que tiene un middleware)

    Service.getProducts(siteId, name, limit)
        .then(response => res.json(response))
        .catch(err => []);

});

module.exports = router;
