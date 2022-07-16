import React from "react";
import TextAttributeButton from "./TextAttributeButton";

export default class CardOverlayProductDescription extends React.Component {
  // displaing products attributes in product card
  showAttributes() {
    const attributes = this.props.product.attributes;
    return attributes.map((attr) => {
      return (
        <>
          <span className="bag-item-attr">{attr.name}:</span>
          <div className="bag-item-attributes">
            {attr.items.map((item) =>
              attr.type === "text" ? (
                <button
                  className="bag-item-attributes-icon-text"
                  data-attribute-type={attr.type}
                  data-attribute-name={attr.name}
                  data-attribute-value={item.value}
                  onClick={(e) => this.props.makeAttributeButtonActive(e)}>
                  {item.value}
                </button>
              ) : (
                <button
                  className="bag-item-attributes-icon-swatch"
                  style={{
                    backgroundColor: `${item.value}`,
                    border: "none",
                  }}
                  data-attribute-type={attr.type}
                  data-attribute-name={attr.name}
                  data-attribute-value={item.value}
                  onClick={(e) => this.props.makeAttributeButtonActive(e)}
                />
              )
            )}
          </div>
        </>
      );
    });
  }

  render() {
    return (
      <div className="bag-container-item-description">
        <span className="bag-item-brand">{this.props.product.brand}</span>
        <span className="bag-item-name">{this.props.product.name}</span>
        <p className="bag-item-price">
          <span className="bag-item-currency">{this.props.currency}</span>
          {
            this.props.product.prices.find(
              (price) => price.currency.symbol === this.props.currency
            ).amount
          }
        </p>
        {this.props.product.attributes.length ? this.showAttributes() : null}
      </div>
    );
  }
}
