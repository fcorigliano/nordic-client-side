const React = require("react");
const View = require("./view");
const ImageProvider = require("nordic/image/provider");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");
const Service = require("../../../services/productsService");
const imagesPrefix = config.assets.prefix;


exports.fetchProducts = function fetchProducts(req, res, next) {
  const { siteId } = req.platform;
  const { name, limit, offset } = req.query;
    Service.getProducts(
        siteId, name, limit, offset)
            .then(response => { res.locals.productList = response 
            next()
    })
        .catch(err => next(err))
};

exports.render = function render(req, res) {
  const ProductList = props => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider>
    </I18nProvider>
  )

  res.render(ProductList, {
    productList: res.locals.productList,
    translations: req.translations,
    imagesPrefix,
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'full',
    },
    });
};
