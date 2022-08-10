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


function View(props) {
  const { products, imagesPrefix, translations, i18n } = props;

  const preloadedState = {
    products,
    imagesPrefix,
    translations,
    i18n,
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="integracion.js" />

      <header>
        <h1>Esto es un header</h1>
      </header>

      <main>
      <ul style={{ listStyleType: "none" }}>
        {products.map((item) => (
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
          ))}
      </ul>
      </main>

      <footer>
        <span>Esto es un footer</span>
      </footer>

    </>
  );
}

module.exports = injectI18n(View);
