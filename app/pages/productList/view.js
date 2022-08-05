const React = require("react");
const Script = require("nordic/script");
const Head = require('nordic/head');
const Image = require("nordic/image");
const { injectI18n } = require("nordic/i18n");
const serialize = require("serialize-javascript");

const restclient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "/api",
});

const { useState, useEffect } = React;

function View(props) {
  const { imagesPrefix, translations, i18n } = props;

  const preloadedState = { imagesPrefix, translations, i18n };

  const [productList, setProducts] = useState([]);

  useEffect(() => {
    restclient
      .get("/get-products", {
        params: {
          name: "Samsung",
          limit: 10,
        },
      })
      .then(res => setProducts(res.data));
  }, []);

  return (
   <>
      <Head>
        <title>
          Products Page
        </title>
      </Head>
    <Script>
    {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
        `}
     </Script>
     <Script src='vendor.js' />
     <Script src='productList.js' />

     <ul>
        {productList.length > 0
          ? productList.map(item => (
              <li key={item.id}>
                <h5>{i18n.gettext(item.title)}</h5>
                <a href={item.permalink}>
                  <Image
                    src={item.thumbnail}
                    alt={i18n.gettext(item.title)}
                    lazyload="off"
                  />
                </a>
                <p>{item.price}</p>
              </li>
            ))
          : "No se encontraron productos"}
      </ul>

   </>
  );
}
 
module.exports = injectI18n(View);