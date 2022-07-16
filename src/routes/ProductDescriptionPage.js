import React from "react";
import { useParams } from "react-router-dom";
import TextAttributes from "../TextAttributes";
import SwatchAttributes from "../SwatchAttributes";
import ProductDescriptionPageRender from "./ProductDescriptionPageRender";

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
    this.showAttributesIfpresent = this.showAttributesIfpresent.bind(this);
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
              makeAttributeButtonActive={this.props.makeAttributeButtonActive}
              key={item.name}
            />
          );
        if (item.type === "swatch")
          return (
            <SwatchAttributes
              attr={item}
              getProductAttributeValue={this.getProductAttributeValue}
              makeAttributeButtonActive={this.props.makeAttributeButtonActive}
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

  render() {
    return <ProductDescriptionPageRender {...this.props} {...this} />;
  }
}

export default withParams(ProductDescriptionPage);
