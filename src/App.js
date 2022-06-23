import React from "react";
import Head from "./Head";
import ProductList from "./ProductList";
import Categories from "./Categories";
import { client, dataQuery } from "./dataQueries";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDescriptionPage from "./routes/ProductDescriptionPage";
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

  render() {
    return (
      <BrowserRouter>
        <Head
          {...this.state}
          productData={this.products}
          chooseCurrency={this.chooseCurrency}
          closeCurrencyMenuFromOutside={this.closeCurrencyMenuFromOutside}
          setStateFromChildComponent={this.setStateFromChildComponent}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Categories
                  category={this.state.category}
                  setCategory={this.setCategory}
                  closeCurrencyMenuFromOutside={
                    this.closeCurrencyMenuFromOutside
                  }
                />

                <ProductList
                  {...this.state}
                  products={this.products}
                  queryProductData={this.queryProductData}
                  setStateFromChildComponent={this.setStateFromChildComponent}
                  closeCurrencyMenuFromOutside={
                    this.closeCurrencyMenuFromOutside
                  }
                />
              </>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDescriptionPage
                {...this.state}
                products={this.products}
                closeCurrencyMenuFromOutside={this.closeCurrencyMenuFromOutside}
                setStateFromChildComponent={this.setStateFromChildComponent}
              />
            }></Route>
          <Route
            path="*"
            element={
              <h2
                className="page-not-found"
                onClick={this.closeCurrencyMenuFromOutside}>
                Opps! There is nothing here...
              </h2>
            }></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default <App />;
