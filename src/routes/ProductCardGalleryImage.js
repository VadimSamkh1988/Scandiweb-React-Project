import React from "react";

export default class ProductCardGalleryImage extends React.Component {
  // choosing product image from the gallery on left side of the page
  chooseProductImage(e) {
    const img = document.querySelector(".product-page-img");
    img.src = e.target.src;
  }
  render() {
    return (
      <img
        className="product-page-gallery-item"
        src={this.props.img}
        width="88px"
        alt="product gallery"
        onClick={(e) => this.chooseProductImage(e)}
      />
    );
  }
}
