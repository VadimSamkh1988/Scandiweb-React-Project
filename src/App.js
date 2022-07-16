import React from "react";
import { client, dataQuery } from "./dataQueries";
import AppsRender from "./AppsRender";
import "./css/style.css";
import "./css/normalize.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: localStorage.getItem("currency")
        ? JSON.parse(localStorage.getItem("currency"))
        : "$",
      category: localStorage.getItem("category")
        ? JSON.parse(localStorage.getItem("category"))
        : "all",
      productInCard:
        localStorage.getItem("productInCard") !== ""
          ? JSON.parse(localStorage.getItem("productInCard"))
          : "",
    };

    this.queryProductData = this.queryProductData.bind(this);
    this.chooseCurrency = this.chooseCurrency.bind(this);
    this.setStateFromChildComponent =
      this.setStateFromChildComponent.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.closeCurrencyMenuFromOutside =
      this.closeCurrencyMenuFromOutside.bind(this);
    this.makeAttributeButtonActive = this.makeAttributeButtonActive.bind(this);
  }

  products = [];

  // fetching product data from API
  queryProductData() {
    client
      .query({
        query: dataQuery,
      })
      .then((result) => {
        this.products = result.data.category.products;
        this.setState({ ...this.state });
      });
  }

  // changing state from child components
  setStateFromChildComponent(obj) {
    this.setState(obj);
  }

  // choosing currency from currency changing menu
  chooseCurrency(e) {
    this.setState({ currency: e.target.dataset.currency });
    localStorage.setItem("currency", JSON.stringify(e.target.dataset.currency));
  }

  // closing currencyMenu by clicking outside of it
  closeCurrencyMenuFromOutside() {
    const currencyMenu = document.querySelector(".currency-switcher-menu");
    const currencyMenuArrow = document.querySelector(
      ".currency-switcher-arrow-img"
    );

    currencyMenu.classList.remove("active");
    currencyMenuArrow.classList.remove("currency-switcher-arrow-active");
  }

  /* set category name to either "all", or one of those coming from API*/
  setCategory(e) {
    const categories = document.querySelectorAll(".categories-filter-item");

    [...categories]
      .filter((item) => item !== e.target)
      .forEach((item) => item.classList.remove("active-category"));

    e.target.classList.add("active-category");

    if (this.props.category !== e.target.dataset.categoryName)
      this.setStateFromChildComponent({
        category: e.target.dataset.categoryName,
      });

    localStorage.setItem(
      "category",
      JSON.stringify(e.target.dataset.categoryName)
    );
  }

  // adds nessesary css class to active attribute button
  makeAttributeButtonActive(e) {
    const node = e.target;
    const className = `${node.classList}-active`;
    const parentNode = node.parentNode;

    if (!node.classList.contains(className)) node.classList.add(className);

    [...parentNode.childNodes]
      .filter(
        (childNode) =>
          childNode.dataset.attributeValue !== node.dataset.attributeValue
      )
      .forEach((item) => item.classList.remove(className));
  }

  render() {
    return <AppsRender {...this} />;
  }
}

export default <App />;
