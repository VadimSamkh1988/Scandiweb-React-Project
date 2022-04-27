import React from "react";

export default class Header extends React.Component {
  showProductQuantityInCard() {
    if (this.props.productInCard && this.props.productInCard.length)
      return (
        <div className="bag-switcher-count">
          {this.props.productInCard.length}
        </div>
      );
  }
  render() {
    return (
      <nav className="header" onClick={(e) => this.props.toggleMenus(e)}>
        <ul className="product-filter">
          <li className="product-filter-item">women</li>
          <li className="product-filter-item">men</li>
          <li className="product-filter-item">kids</li>
        </ul>

        <div className="header-logo">
          <img src="./img/logo.svg" width="31px" alt="logo" />
        </div>

        <ul className="currency-bag-container">
          <li className="currency-switcher">
            <span className="currency-switcher-item">
              {this.props.currency}
            </span>
          </li>
          <li className="currency-switcher-arrow">
            <img
              className="currency-switcher-arrow-img"
              src="./img/currency-arrow.svg"
              alt="currency arrow"
            />
          </li>
          <li className="bag-switcher">
            <img
              src="./img/bag.svg"
              className="bag-switcher-img"
              alt="bag logo"
              onClick={this.props.closeCurrencyMenuFromOutside}
            />
          </li>
        </ul>
        {this.showProductQuantityInCard()}
      </nav>
    );
  }
}
