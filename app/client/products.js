const React = require('react');
const View = require('../pages/products/view');
const hydrate = require('nordic/hydrate');

hydrate(<View/>, document.getElementById('root-app'));