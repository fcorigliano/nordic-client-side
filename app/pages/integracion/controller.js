const React = require("react");
const View = require("./view");
const ImageProvider = require("nordic/image/provider");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ProductsService = require("../../../services/productsService");
const imagesPrefix = config.assets.prefix;

exports.fetchProducts = function fetchProducts(req, res, next){
  const { siteId } = req.platform;
  const { name, limit, offset } = req.query;
  ProductsService.getProducts(siteId, 'celular', 5, 0)
    .then(data => {
      res.locals.products = data;
      next()
    })
    .catch(err => next(err));
}


exports.render = function render(req, res) {
  const Integracion = props => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider>
    </I18nProvider>
  )

  res.render(Integracion, {
    products: res.locals.products,
    translations: req.translations,
    imagesPrefix
    });
};
