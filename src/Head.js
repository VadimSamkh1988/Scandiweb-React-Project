import React from "react";
import Header from "./Header";
import CardOverlay from "./CardOverlay";

export default class Head extends React.Component {
  constructor() {
    super();
    this.toggleCurrencySwitcher = this.toggleCurrencySwitcher.bind(this);
    this.clickOnCurrencyMenu = this.clickOnCurrencyMenu.bind(this);
    this.showProductBag = this.showProductBag.bind(this);
    this.toggleMenus = this.toggleMenus.bind(this);
  }

  // get all currencies labels and symbols
  showCurrencyLabelsAndSymbols() {
    const currenciesList = document.querySelector(".currency-switcher-menu");

    this.props.productData[1].prices.forEach((item) => {
      currenciesList.insertAdjacentHTML(
        "beforeend",
        `<li
          class="currency-switcher-item"
          key="${item.currency.symbol}"
          data-currency="${item.currency.symbol}">
        ${item.currency.symbol}  ${item.currency.label}
        </li>`
      );
    });

    [...currenciesList.childNodes]
      .find((node) => node.dataset.currency === this.props.currency)
      .classList.add("active-category");
    currenciesList.childNodes.forEach((item) =>
      item.addEventListener("click", (e) => this.clickOnCurrencyMenu(e))
    );
  }

  // open or close currency switcher menu
  toggleCurrencySwitcher() {
    const switcher = document.querySelector(".currency-switcher-menu");
    const switcherArrow = document.querySelector(
      ".currency-switcher-arrow-img"
    );
    switcherArrow.classList.toggle("currency-switcher-arrow-active");
    switcher.classList.toggle("active");
    if (!switcher.childNodes.length) this.showCurrencyLabelsAndSymbols();
  }

  // highlights active currency with green color
  styleCurrencyItem(e) {
    const allCurrencies = document.querySelectorAll(".currency-switcher-item");
    allCurrencies.forEach((item) => item.classList.remove("active-category"));
    e.target.classList.add("active-category");
  }

  // both chooseCurrency and styleCurrency in single function
  clickOnCurrencyMenu(e) {
    this.props.chooseCurrency(e);
    this.styleCurrencyItem(e);
  }

  // open or close product bag by clicking on bag image
  showProductBag() {
    const bag = document.querySelector(".bag-container");
    const emptyBag = document.querySelector(".product-bag-empty");
    const background = document.querySelector(".background-layout");

    this.props.productInCard && this.props.productInCard.length
      ? bag.classList.toggle("active")(background.classList.toggle("active"))
      : emptyBag.classList.toggle("active");
    setTimeout(() => {
      emptyBag.classList.toggle("active");
    }, 800);
  }

  /* calls paticular function depending on wheither the event target is currency switcher or product bag logo*/
  toggleMenus(e) {
    if (
      e.target.classList.contains("currency-switcher") ||
      e.target.classList.contains("currency-switcher-item") ||
      e.target.classList.contains("currency-switcher-arrow") ||
      e.target.classList.contains("currency-switcher-arrow-img")
    ) {
      this.toggleCurrencySwitcher(e);
      return;
    }

    if (
      e.target.classList.contains("bag-switcher") ||
      e.target.classList.contains("bag-switcher-img")
    ) {
      this.showProductBag();
      return;
    }

    this.props.closeCurrencyMenuFromOutside(e);
  }

  render() {
    return (
      <>
        <Header
          productInCard={this.props.productInCard}
          currency={this.props.currency}
          toggleMenus={this.toggleMenus}
          closeCurrencyMenuFromOutside={this.props.closeCurrencyMenuFromOutside}
        />
        <CardOverlay {...this.props} />

        <ul className="currency-switcher-menu"></ul>
        <div className="background-layout"> </div>
      </>
    );
  }
}
