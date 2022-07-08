require('../pages/productList/styles.scss');

const React = require('react');
const hydrate = require('nordic/hydrate');
const I18n = require('nordic/i18n');
const I18nProvider = require('nordic/i18n/I18nProvider');
const ImageProvider = require('nordic/image/provider');
const ProductListView = require('../pages/productList/view');

const {
    products,
    imagesPrefix
} = window.__PRELOADED_STATE__;

hydrate(
    <ImageProvider prefix={imagesPrefix}>
        <ProductListView products={products} />
    </ImageProvider>,
    document.getElementById('root-app'),
);
