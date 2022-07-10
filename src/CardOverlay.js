import React from "react";
import CardOverlayRender from "./CardOverlayRender";

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
    return <CardOverlayRender {...this} {...this.props} />;
  }
}
