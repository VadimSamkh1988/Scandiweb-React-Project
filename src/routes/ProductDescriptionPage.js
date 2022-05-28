import React from "react";
import { useParams } from "react-router-dom";
import TextAttributes from "../TextAttributes";
import SwatchAttributes from "../SwatchAttributes";

function withParams(Component) {
  return (props) => <Component params={useParams()} {...props} />;
}

class ProductDescriptionPage extends React.Component {
  product = this.props.products.find(
    (product) => product.id === this.props.params.id
  );
  productImage = this.product.gallery[0];

  // parsing HMTL data with product description
  parseHTMLProductDescripionData() {
    const parent = document.querySelector(".product-page-description-text");
    const parser = new DOMParser();
    let html = parser.parseFromString(this.product.description, "text/html");

    html.getElementsByTagName("body")
      ? (parent.innerHTML = html.getElementsByTagName("body")[0].innerHTML)
      : (parent.innerHTML = html);
  }

  // checks, wheither product has attributes, and renders them
  showAttributesIfpresent() {
    if (this.product.attributes.length > 0) {
      const attributes = this.product.attributes;
      return attributes.map((item) => {
        if (item.type === "text") return <TextAttributes attr={item} />;
        if (item.type === "swatch") return <SwatchAttributes attr={item} />;
      });
    }
  }

  // choosing product image from the gallery on left side of the page
  chooseProductImage(e) {
    const img = document.querySelector(".product-page-img");
    img.src = e.target.src;
  }

  componentDidMount() {
    this.parseHTMLProductDescripionData();
  }

  render() {
    return (
      <section
        className="product-page-content"
        onClick={this.props.closeCurrencyMenuFromOutside}>
        <aside className="product-page-gallery">
          {this.product.gallery.map((img) => {
            return (
              <img
                key={img}
                src={img}
                width="88px"
                alt="product gallery"
                className="product-page-gallery-item"
                onClick={(e) => this.chooseProductImage(e)}
              />
            );
          })}
        </aside>
        <main className="product-page-description-container">
          <div className="product-page-img-wrapper">
            <img
              src={this.productImage}
              alt="product"
              className="product-page-img"
            />
          </div>
          <div className="product-page-description">
            <span className="product-page-brand"> {this.product.brand}</span>
            <br />
            <span className="product-page-name"> {this.product.name} </span>
            <div className="product-page-attributes">
              {this.showAttributesIfpresent()}
              <span className="product-page-price-title"> Price </span> <br />
              <span className="product-page-price">
                {this.props.currency}
                {
                  this.product.prices.find(
                    (item) => item.currency.symbol === this.props.currency
                  ).amount
                }
              </span>
              <br />
              <button className="product-page-add-to-card">add to card</button>
              <div className="product-page-description-text"></div>
            </div>
          </div>
        </main>
      </section>
    );
  }
}

export default withParams(ProductDescriptionPage);
