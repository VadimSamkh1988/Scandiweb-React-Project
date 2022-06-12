import React from "react";
import logo from "./images/logo.svg";
import currencyArrow from "./images/currency-arrow.svg";
import bag from "./images/bag.svg";
import "../src/css/style.css";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="header" onClick={(e) => this.props.toggleMenus(e)}>
        <ul className="product-filter">
          <li className="product-filter-item">women</li>
          <li className="product-filter-item">men</li>
          <li className="product-filter-item">kids</li>
        </ul>

        <div className="header-logo">
          <img src={logo} width="31px" alt="logo" />
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
              src={currencyArrow}
              alt="currency arrow"
            />
          </li>
          <li className="bag-switcher">
            <img
              src={bag}
              className="bag-switcher-img"
              alt="bag logo"
              onClick={this.props.closeCurrencyMenuFromOutside}
            />
          </li>
        </ul>
        {this.props.productInCard ? (
          <div className="bag-switcher-count">
            {this.props.productInCard
              .map((product) => product.quantity)
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
              )}
          </div>
        ) : (
          ""
        )}
      </nav>
    );
  }
}
