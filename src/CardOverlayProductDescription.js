import React from "react";

export default class CardOverlayProductDescription extends React.Component {
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
        {this.props.product.attributes.length ? (
          <div className="bag-item-attributes">
            <div className="bag-item-attributes-icon">S</div>
            <div className="bag-item-attributes-icon">M</div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
