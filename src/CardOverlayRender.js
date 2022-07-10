import React from "react";
import CardOverlayProductCount from "./CardOverlayProductCount";
import CardOverlayProductDescription from "./CardOverlayProductDescription";
import CardOverlayProductsTotalPrice from "./CardOverlayProductsTotalPrice";

export default class CardOverlayRender extends React.Component {
  render() {
    return (
      <>
        {this.props.productInCard &&
        this.props.productData.length > 0 &&
        this.props.productInCard.length > 0 ? (
          <section className="bag-container">
            <h2 className="bag-container-title">
              My Bag,
              <span className="bag-items-quantity">
                {`${this.props.productInCard
                  .map((product) => product.quantity)
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  )} items`}
              </span>
            </h2>
            {this.props.productInCard.map((product) => (
              <>
                <div className="bag-container-item">
                  <CardOverlayProductDescription
                    product={this.props.productData.find(
                      (item) => item.id === product.id
                    )}
                    productInCard={this.props.productInCard}
                    currency={this.props.currency}
                    key={product.id}
                  />
                  <CardOverlayProductCount
                    changeItemQuantity={this.props.changeItemQuantity}
                    product={this.props.productData.find(
                      (item) => item.id === product.id
                    )}
                    count={product.quantity}
                    id={product.id}
                    key={product.attributesCollection}
                    attributesCollection={product.attributesCollection}
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
