const React = require('react');
const Script = require('nordic/script');

const restclient = require('nordic/restclient')({
    timeout: 5000,
    baseURL: '/api'
});

const { useState } = React;
const head = require('nordic/head');

function View(props){
    const [ data, setData ] = useState([])
    React.useEffect(() => {
        restclient.get('/get-products')
            .then(res => setData(res.data))
    }, []);

    return(<>
        <Script src='vendor.js' /> 
        <Script src='products.js' />

        <ul>
            {data.length > 0 ? data.map(p => <li>{p.title}</li>) : <li>No hay nada</li>}
        </ul>
    </>);

}

module.exports = View;