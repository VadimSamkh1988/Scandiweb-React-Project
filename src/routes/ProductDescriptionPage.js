import React from "react";
import { useParams } from "react-router-dom";
import TextAttributes from "../TextAttributes";
import SwatchAttributes from "../SwatchAttributes";
import AddToCardButton from "../AddToCardButton";
import ProductCardGalleryImage from "../ProductCardGalleryImage";
import ProductCardMainImage from "../ProductCardMainImage";

function withParams(Component) {
  return (props) => <Component params={useParams()} {...props} />;
}

class ProductDescriptionPage extends React.Component {
  constructor(props) {
    super(props);

    this.product =
      this.props.products.find(
        (product) => product.id === this.props.params.id
      ) || JSON.parse(localStorage.getItem("product"));

    localStorage.removeItem("product");
    localStorage.setItem("product", JSON.stringify(this.product));

    this.getProductAttributeValue = this.getProductAttributeValue.bind(this);
    this.makeAttributeButtonActive = this.makeAttributeButtonActive.bind(this);
  }

  productAttributes = [];

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
        if (item.type === "text")
          return (
            <TextAttributes
              attr={item}
              getProductAttributeValue={this.getProductAttributeValue}
              makeAttributeButtonActive={this.makeAttributeButtonActive}
              key={item.name}
            />
          );
        if (item.type === "swatch")
          return (
            <SwatchAttributes
              attr={item}
              getProductAttributeValue={this.getProductAttributeValue}
              makeAttributeButtonActive={this.makeAttributeButtonActive}
              key={item.name}
            />
          );
      });
    }
  }

  componentDidMount() {
    this.parseHTMLProductDescripionData();
  }

  /* gets product attribute value, when user clicks on attribute button */
  getProductAttributeValue(e) {
    if (
      !this.productAttributes.find(
        (item) => item.name === e.target.dataset.attributeName
      )
    ) {
      this.productAttributes.push({
        name: e.target.dataset.attributeName,
        value: e.target.dataset.attributeValue,
      });
      return;
    }

    this.productAttributes.find(
      (item) => item.name === e.target.dataset.attributeName
    ).value = e.target.dataset.attributeValue;
  }

  // adds nessesary css class to active attribute button
  makeAttributeButtonActive(e) {
    if (
      !this.product.inStock ||
      e.target.classList.contains(
        "text-attribute-active" || "swatch-attribute-active"
      )
    )
      return;

    const className = `${e.target.classList}-active`;
    const parentNode = e.target.parentNode;

    [...parentNode.childNodes]
      .find(
        (node) =>
          node.dataset.attributeValue === e.target.dataset.attributeValue
      )
      .classList.add(className);

    [...parentNode.childNodes]
      .filter(
        (node) =>
          node.dataset.attributeValue !== e.target.dataset.attributeValue
      )
      .forEach((item) => item.classList.remove(className));
  }

  render() {
    return (
      <section
        className="product-page-content"
        onClick={this.props.closeCurrencyMenuFromOutside}>
        <aside className="product-page-gallery">
          {this.product.gallery.map((img) => {
            return <ProductCardGalleryImage img={img} key={img} />;
          })}
        </aside>
        <main className="product-page-description-container">
          <ProductCardMainImage productMainImage={this.product.gallery[0]} />
          <div className="product-page-description">
            <span className="product-page-brand"> {this.product.brand} </span>
            <br />
            <span className="product-page-name">{this.product.name}</span>
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
              <AddToCardButton
                label={this.product.inStock ? "add to card" : "out of stock"}
                product={this.product}
                productAttributes={this.productAttributes}
                productInCard={this.props.productInCard}
                setStateFromChildComponent={
                  this.props.setStateFromChildComponent
                }
                totalQuantityOfProductsInCard={
                  this.props.totalQuantityOfProductsInCard
                }
              />
              <p className="product-attributes-required-label product-page-attributes-required">
                Please, specify product attributes like color, size, etc
              </p>
              <div className="product-page-description-text"> </div>
            </div>
          </div>
        </main>
      </section>
    );
  }
}

export default withParams(ProductDescriptionPage);
