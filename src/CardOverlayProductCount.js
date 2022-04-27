import React from "react";

export default class CardOverlayProductCount extends React.Component {
  render() {
    return (
      <>
        <div className="bag-container-item-manage">
          <button
            className="add-item"
            data-sigh="+"
            onClick={(e) => this.props.changeItemQuantity(e, this.props.id)}>
            +
          </button>
          <span className="item-count">{this.props.count}</span>
          <button
            className="substrat-item"
            data-sigh="-"
            onClick={(e) => this.props.changeItemQuantity(e, this.props.id)}>
            -
          </button>
        </div>
        <img
          src={this.props.product.gallery[0]}
          alt="product image"
          className="bag-container-item-image"
          width="120px"
        />
      </>
    );
  }
}
