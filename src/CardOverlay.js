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
  changeItemQuantity(e, id) {
    const sigh = e.target.dataset.sigh;
    const background = document.querySelector(".background-layout");

    if (this.props.productInCard.length === 1 && sigh === "-") {
      // this.props.setStateFromChildComponent({ productInCard: [] });
      this.products = [];
      background.classList.remove("active");
      localStorage.removeItem("productInCard");
      return;
    }

    let productInCard = [...this.props.productInCard];
    const newProduct = productInCard.find((product) => product.id === id);
    if (sigh === "+") {
      if (
        this.products.find((product) => product.id === id).attributes.length !==
        0
      )
        productInCard.push(newProduct);

      this.products.find((product) => product.id === id).quantity += 1;
      this.props.setStateFromChildComponent({ productInCard });
      localStorage.setItem("productInCard", JSON.stringify(productInCard));
      return;
    }

    productInCard.splice(productInCard.indexOf(newProduct), 1);
    this.products.find((product) => product.id === id).quantity -= 1;
    this.props.setStateFromChildComponent({ productInCard });
    localStorage.setItem("productInCard", JSON.stringify(productInCard));
  }

  // sortProductsByAttributes() {
  //   if (this.props.productInCard && this.props.productInCard.length)
  //     this.props.productInCard.map((product) => {
  //       if (
  //         !this.products.includes(product.id) &&
  //         product.attributes.length === 0
  //       )
  //         this.products.push({
  //           id: product.id,
  //           attributes: product.attributes,
  //           quantity: 1,
  //         });
  //     });

  //   if (this.props.productInCard && this.props.productInCard.length)
  //     this.props.productInCard.map((product) => {
  //       if (product.attributes.length !== 0)
  //         this.products.push({
  //           id: product.id,
  //           attributes: product.attributes,
  //           quantity: 1,
  //         });
  //     });
  // }

  render() {
    // this.sortProductsByAttributes();
    return (
      <>
        {this.props.productInCard && this.props.productInCard.length ? (
          <section className="bag-container">
            <h2 className="bag-container-title">
              My Bag,
              <span className="bag-items-quantity">
                {`${this.props.totalQuantityOfProductsInCard} items`}
              </span>
            </h2>
            {/* {this.products.map((product) => (
              <>
                <div className="bag-container-item">
                  <CardOverlayProductDescription
                    product={this.props.productInCard.find(
                      (item) => item.id === product.id
                    )}
                    currency={this.props.currency}
                    key={
                      this.props.productInCard.find(
                        (item) => item.id === product.id
                      ).id
                    }
                  />
                  <CardOverlayProductCount
                    changeItemQuantity={this.changeItemQuantity}
                    product={this.props.productInCard.find(
                      (item) => item.id === product.id
                    )}
                    count={product.quantity}
                    id={
                      this.props.productInCard.find(
                        (item) => item.id === product.id
                      ).id
                    }
                    key={product.id}
                  />
                </div>
              </>
            ))} */}
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
