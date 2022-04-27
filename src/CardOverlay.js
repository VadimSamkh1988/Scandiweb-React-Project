import React from "react";
import CardOverlayProductCount from "./CardOverlayProductCount";
import CardOverlayProductDescription from "./CardOverlayProductDescription";
import CardOverlayProductsTotalPrice from "./CardOverlayProductsTotalPrice";

export default class CardOverlay extends React.Component {
  productsWithoutAttributes = [];

  getProductsWithoutAttributes() {
    if (this.props.productInCard && this.props.productInCard.length)
      this.props.productInCard.map((product) => {
        if (
          !this.productsWithoutAttributes.includes(product.id) &&
          product.attributes.length === 0
        )
          this.productsWithoutAttributes.push(product.id);
      });
  }

  render() {
    this.getProductsWithoutAttributes();

    return (
      <>
        {this.props.productInCard && this.props.productInCard.length ? (
          <section className="bag-container">
            <h2 className="bag-container-title">
              My Bag,
              <span className="bag-items-quantity">
                {`${this.props.productInCard.length} items`}
              </span>
            </h2>
            {this.productsWithoutAttributes.map((id) => (
              <>
                <div className="bag-container-item">
                  <CardOverlayProductDescription
                    product={this.props.productInCard.find(
                      (product) => product.id === id
                    )}
                    currency={this.props.currency}
                    key={
                      this.props.productInCard.find(
                        (product) => product.id === id
                      ).id
                    }
                  />
                  <CardOverlayProductCount
                    changeItemQuantity={this.props.changeItemQuantity}
                    product={this.props.productInCard.find(
                      (product) => product.id === id
                    )}
                    count={
                      this.props.productInCard.filter((id) => id === id).length
                    }
                    id={
                      this.props.productInCard.find(
                        (product) => product.id === id
                      ).id
                    }
                    key={id}
                  />
                </div>
              </>
            ))}
            <CardOverlayProductsTotalPrice {...this.props} />
            <div className="bag-container-footer">
              <button className="bag-container-footer-manage">view bag</button>
              <button className="bag-container-footer-manage">check out</button>
            </div>
          </section>
        ) : (
          <h3 className="product-bag-empty">No Products in the bag</h3>
        )}
      </>
    );
  }
}
