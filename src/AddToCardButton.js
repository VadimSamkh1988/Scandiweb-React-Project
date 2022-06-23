import React from "react";

export default class AddToCardButton extends React.Component {
  /* adding product to card from product page, if all nessesary attributes are choosen */
  addProductToCard() {
    if (
      // if all nessesary attributes are chosen if present
      this.props.product.attributes.length === 0 ||
      this.props.productAttributes.length !== 0
    ) {
      this.props.productInCard
        ? this.props.setStateFromChildComponent({
            productInCard: [
              ...this.props.productInCard,
              {
                id: this.props.product.id,
                quantity: 1,
                attributes: this.props.productAttributes,
              },
            ],
          })
        : this.props.setStateFromChildComponent({
            productInCard: [
              {
                id: this.props.product.id,
                quantity: 1,
                attributes: this.props.productAttributes,
              },
            ],
          });
      return;
    }

    const attributesRequiredLabel = document.querySelector(
      ".product-attributes-required-label"
    );
    attributesRequiredLabel.classList.add("active");
    setTimeout(() => {
      attributesRequiredLabel.classList.remove("active");
    }, 2000);
  }

  render() {
    return (
      <button
        className="product-page-add-to-card"
        onClick={
          this.props.product.inStock ? () => this.addProductToCard() : ""
        }>
        {this.props.label}
      </button>
    );
  }
}
