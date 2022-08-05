const React = require("react");
const View = require("./view");
const ImageProvider = require("nordic/image/provider");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");

const imagesPrefix = config.assets.prefix;

exports.render = function render(req, res) {
  const Products = props => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider>
    </I18nProvider>
  )

  res.render(Products, {
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
