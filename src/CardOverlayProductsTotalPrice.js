import React from "react";

export default class CardOverlayProductsTotalPrice extends React.Component {
  render() {
    return (
      <div className="bag-container-total-price-count">
        <h2 className="total-price-title"> Total </h2>{" "}
        <p className="total-price">
          <span className="total-price-currency"> {this.props.currency} </span>{" "}
          {this.props.productInCard
            .map(
              (productInCard) =>
                this.props.data
                  .find((product) => product.id === productInCard.id)
                  .prices.find(
                    (price) => price.currency.symbol === this.props.currency
                  ).amount * productInCard.quantity
            )
            .reduce((total, amount) => {
              return (total += amount);
            })
            .toFixed(2)}
        </p>
      </div>
    );
  }
}
