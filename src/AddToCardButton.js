import React from "react";

export default class AddToCardButton extends React.Component {
  /* checking if product with the same attributes is already present in product card */
  checkIfProductPresentInCard() {
    if (
      this.props.productInCard &&
      this.props.productInCard.find(
        (product) =>
          product.id === this.props.product.id &&
          product.attributesCollection ===
            this.props.productAttributes
              .map((item) => item.name.concat("", item.value))
              .toString()
      )
    )
      return true;
  }

  /* adding product to card from product page, if all nessesary attributes are choosen */

  addProductToCard() {
    if (this.checkIfProductPresentInCard()) {
      /* Product is already present in the Card with the same attributes, so we only increase product quantity */

      const productInCard = [...this.props.productInCard];
      productInCard.find(
        (product) =>
          product.id === this.props.product.id &&
          product.attributesCollection ===
            this.props.productAttributes
              .map((item) => item.name.concat("", item.value))
              .toString()
      ).quantity += 1;
      this.props.setStateFromChildComponent({
        productInCard,
      });
    } else {
      /* Product is not present in the card with choosen attributes, adding product with this attributes to the card */

      this.props.productInCard
        ? this.props.setStateFromChildComponent({
            productInCard: [
              ...this.props.productInCard,
              {
                id: this.props.product.id,

                /* quantity property indicates how many the same products with the same attributes are added to the card */

                quantity: 1,
                attributes: this.props.productAttributes,

                /* attributesCollection property is for searching 
                the same products with the same attributes in the card */

                attributesCollection: this.props.productAttributes
                  .map((item) => item.name.concat("", item.value))
                  .toString(),
              },
            ],
          })
        : /* Card is empty, adding the first product */

          this.props.setStateFromChildComponent({
            productInCard: [
              {
                id: this.props.product.id,
                quantity: 1,
                attributes: this.props.productAttributes,
                attributesCollection: this.props.productAttributes
                  .map((item) => item.name.concat("", item.value))
                  .toString(),
              },
            ],
          });
    }
  }

  /* If nessesary attributes are not choosen by user, popup 
  label is displaing */

  showRequiredAttributesLabel() {
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
          this.props.product.inStock
            ? () =>
                this.props.product.attributes.length ===
                this.props.productAttributes.length
                  ? this.addProductToCard()
                  : this.showRequiredAttributesLabel()
            : ""
        }>
        {this.props.label}
      </button>
    );
  }
}
