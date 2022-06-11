import React from "react";

export default class ProductCardMainImage extends React.Component {
  render() {
    return (
      <div className="product-page-img-wrapper">
        <img
          className="product-page-img"
          src={this.props.productMainImage}
          alt="product"
        />
      </div>
    );
  }
}
