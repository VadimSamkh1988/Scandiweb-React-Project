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
      currency: "$",
      category: "all",
    };

    this.queryProductData = this.queryProductData.bind(this);
    this.chooseCurrency = this.chooseCurrency.bind(this);
    this.setStateFromChildComponent =
      this.setStateFromChildComponent.bind(this);
    this.changeItemQuantity = this.changeItemQuantity.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }

  products = [];

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

  setStateFromChildComponent(obj) {
    this.setState({ ...this.state, ...obj });
  }

  // choosing currency from currency Routesing menu
  chooseCurrency(e) {
    this.setState({ ...this.state, currency: e.target.dataset.currency });
  }

  // changing product quantity from product card overlay
  changeItemQuantity(e, id) {
    const sigh = e.target.dataset.sigh;
    const background = document.querySelector(".background-layout");

    if (this.state.productInCard.length === 1 && sigh === "-") {
      this.setState({ ...this.state, productInCard: [] });
      background.classList.remove("active");
      return;
    }

    let productInCard = [...this.state.productInCard];
    const newProduct = productInCard.find((product) => product.id === id);
    if (sigh === "+") {
      productInCard.push(newProduct);
      this.setState({ ...this.state, productInCard });
      return;
    }

    productInCard.splice(productInCard.indexOf(newProduct), 1);
    this.setState({ ...this.state, productInCard });
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
  }

  render() {
    return (
      <BrowserRouter>
        <Head
          productInCard={this.state.productInCard}
          currency={this.state.currency}
          productData={this.products}
          chooseCurrency={this.chooseCurrency}
          changeItemQuantity={this.changeItemQuantity}
          closeCurrencyMenuFromOutside={this.closeCurrencyMenuFromOutside}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Categories
                  category={this.state.category}
                  setCategory={this.setCategory}
                  client={this.client}
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
                products={this.products}
                closeCurrencyMenuFromOutside={this.closeCurrencyMenuFromOutside}
                currency={this.state.currency}
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
