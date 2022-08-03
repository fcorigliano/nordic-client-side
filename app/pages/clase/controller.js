const React = require('react');
const View = require('./view');

exports.render = function render(req, res) {

    const Clase = props => <View { ...props } />

    res.render(Clase, {
        message: 'Hola Wave 5 🌚, son los mejores, no hacía falta aclararlo!'
    })
}