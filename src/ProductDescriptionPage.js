import React from "react";

export default class ProductDescriptionPae extends React.Component {
  render() {
    return (
      <section
        className="product-page-content"
        onClick={this.props.closeCurrencyMenuFromOutside}>
        <aside className="product-page-gallery">
          <img
            src="./img/product.png"
            width="88px"
            alt="product gallery"
            className="product-page-gallery-item"
          />
        </aside>
        <main className="product-page-description-container">
          <img
            src="./img/product.png"
            alt="product"
            className="product-page-img"
            width="610px"
            height="510px"
          />
          <div className="product-page-description">
            <span className="product-page-brand">Apollo</span>
            <br />
            <span className="product-page-name">Running short</span>
            <div className="product-page-attributes">
              <span className="product-page-size-title">size</span>
              <div className="product-page-size">
                <button className="size-attribute">xs</button>
                <button className="size-attribute">s</button>
                <button className="size-attribute">m</button>
                <button className="size-attribute">l</button>
              </div>
              <span className="product-page-color-title">color</span>
              <div className="product-page-color">
                <button className="color-attribute"></button>
                <button className="color-attribute"></button>
                <button className="color-attribute"></button>
              </div>
              <span className="product-page-price-title">Price</span>
              <br />
              <span className="product-page-price">$50.00</span>
              <br />
              <button className="product-page-add-to-card">add to card</button>
              <p className="product-page-description-text">
                Find stunning women's cocktail dresses and party dresses. Stand
                out in lace and metallic cocktail dresses and party dresses from
                all your favorite brands.
              </p>
            </div>
          </div>
        </main>
      </section>
    );
  }
}
