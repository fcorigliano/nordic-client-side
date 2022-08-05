const React = require("react");
const Script = require("nordic/script");
const Head = require("nordic/head");
const Image = require("nordic/image");
const { injectI18n } = require("nordic/i18n");
const serialize = require("serialize-javascript");

const restclient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "/api",
});

const { useState, useEffect } = React;

function View(props) {
  const { productList, offset, imagesPrefix, translations, i18n } = props;

  const preloadedState = {
    productList,
    offset,
    imagesPrefix,
    translations,
    i18n,
  };

  const [newProducts, setProducts] = useState(productList);

  const [offsetState, setOffsetState] = useState(0);

  const handleNextPage = () => {
    setOffsetState(offsetState => offsetState + 10);
  };

  const handlePreviousPage = () => {
    setOffsetState(offsetState => offsetState - 10);
  };

  useEffect(() => {
    if (offsetState == 0) {offsetState == 0}
      restclient
        .get("/get-products", {
          params: {
            name: "samsung",
            limit: 10,
            offset: offsetState,
          },
        })
          .then((response) => setProducts(response.data))
          .catch(() => setProducts([]));
  }, [offsetState]);

  return (
    <>
      <Head>
        <title>Products Page</title>
      </Head>
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="productList.js" />

      <ul style={{ listStyleType: "none" }}>
        {newProducts.length > 0
          ? newProducts.map((item) => (
              <li key={item.id}>
                <h3>{i18n.gettext(item.title)}</h3>
                <a href={item.permalink}>
                  <Image
                    src={item.thumbnail}
                    alt={i18n.gettext(item.title)}
                    lazyload="off"
                  />
                </a>
                <p
                  style={{
                    backgroundColor: "#ff8d3b",
                    borderRadius: "5px",
                    textAlign: "center",
                    width: "75px",
                  }}
                >
                  ${item.price}
                </p>
              </li>
            ))
          : "No se encontraron productos"}
      </ul>

      <button onClick={handlePreviousPage}>Anterior</button>
      <button onClick={handleNextPage}>Siguiente</button>
    </>
  );
}

module.exports = injectI18n(View);
