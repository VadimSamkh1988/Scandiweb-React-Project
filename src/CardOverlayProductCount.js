import React from "react";
import ChangeItemQuantityButton from "./ChangeItemQuantityButton";

export default class CardOverlayProductCount extends React.Component {
  render() {
    return (
      <>
        <div className="bag-container-item-manage">
          <ChangeItemQuantityButton
            className="add-item"
            dataSigh="+"
            changeItemQuantity={this.props.changeItemQuantity}
            count={this.props.count}
            id={this.props.id}
            attributesCollection={this.props.attributesCollection}
          />
          <span className="item-count">{this.props.count}</span>
          <ChangeItemQuantityButton
            className="substrat-item"
            dataSigh="-"
            changeItemQuantity={this.props.changeItemQuantity}
            count={this.props.count}
            id={this.props.id}
            attributesCollection={this.props.attributesCollection}
          />
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
