import React from "react";
import { Link } from "react-router-dom";

export default class Product extends React.Component {
  /* check wheither product is in stock and if not, show "Out of stock" label */
  isInStock() {
    if (!this.props.inStock) {
      return (
        <div className="product-card-background">
          <h2 className="product-card-stock-title"> out of stock </h2>
        </div>
      );
    }
  }

  // if product is inStock, add "to-card" image to the DOM
  addToCardIconIfInStock() {
    if (this.props.inStock) {
      return (
        <img
          className="product-add-to-card"
          src="./img/bag-link.svg"
          alt="add to card icon"
          onClick={(e) => this.addProductToCard(e)}
        />
      );
    }
  }

  /*click on the icon  checks wheither the product has attributes like size, color, etc and if so, shows popup tip, telling user to specify product attributes, or if there are no attributes,adds product to card*/
  addProductToCard(e) {
    const productCardLayout = e.target.parentElement;
    const productInCard = this.props.productInCard || [];

    if (this.props.attributes.length) {
      const attributesRequiredLabel = productCardLayout.querySelector(
        ".product-attributes-required-label"
      );
      attributesRequiredLabel.classList.add("active");
      setTimeout(() => {
        attributesRequiredLabel.classList.remove("active");
      }, 2000);
      return;
    }

    productInCard.push(
      this.props.products.find(
        (product) => product.id === productCardLayout.dataset.productId
      )
    );
    this.props.setStateFromChildComponent({
      productInCard,
    });
  }

  render() {
    return (
      <div className="product-card" data-product-id={this.props.id}>
        <Link to={`/products/${this.props.id}`}>
          <div className="product-image">
            <img
              className="product-image-content"
              src={this.props.gallery[0]}
              alt="product"
            />
          </div>
          <p className="product-description">
            {this.props.brand} {this.props.name}
          </p>
          <span className="product-price">
            {this.props.currency}
            {
              this.props.prices.find(
                (item) => item.currency.symbol === this.props.currency
              ).amount
            }
          </span>
          <p className="product-attributes-required-label">
            Please, specify product properties in product description page
          </p>
          {this.isInStock()}
        </Link>
        {this.addToCardIconIfInStock()}
      </div>
    );
  }
}
