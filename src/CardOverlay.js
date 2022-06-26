import React from "react";
import CardOverlayProductCount from "./CardOverlayProductCount";
import CardOverlayProductDescription from "./CardOverlayProductDescription";
import CardOverlayProductsTotalPrice from "./CardOverlayProductsTotalPrice";

export default class CardOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.changeItemQuantity = this.changeItemQuantity.bind(this);
  }

  // changing product quantity from product card overlay
  changeItemQuantity(e, attributesCollection) {
    const sigh = e.target.dataset.sigh;
    const background = document.querySelector(".background-layout");
    const productInCard = [...this.props.productInCard];
    let product = productInCard.find(
      (product) => product.attributesCollection === attributesCollection
    );

    sigh === "+" ? (product.quantity += 1) : (product.quantity -= 1);

    if (
      productInCard.find(
        (product) => product.attributesCollection === attributesCollection
      ).quantity === 0
    ) {
      productInCard.splice(
        productInCard.indexOf(
          productInCard.find(
            (product) =>
              product.attributesCollection === attributesCollection &&
              product.quantity === 0
          )
        ),
        1
      );
    }

    if (productInCard.length === 0) {
      background.classList.remove("active");
      localStorage.removeItem("productInCard");
      this.props.setStateFromChildComponent({ productInCard: [] });
      return;
    }

    this.props.setStateFromChildComponent({ productInCard });
    localStorage.setItem("productInCard", JSON.stringify(productInCard));
  }

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
                    currency={this.props.currency}
                    key={product.id}
                  />
                  <CardOverlayProductCount
                    changeItemQuantity={this.changeItemQuantity}
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
