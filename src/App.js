import React from "react";
import Head from "./Head";
import Main from "./Main";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

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
  }

  categories = [];
  products = [];

  client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });

  queryProductData() {
    this.query = gql`
      query {
        category(input: { title: "all" }) {
          products {
            category
            gallery
            name
            brand
            id
            inStock
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            attributes {
              id
              name
              type
              items {
                displayValue
                id
                value
              }
            }
          }
        }
      }
    `;
    this.client
      .query({
        query: this.query,
      })
      .then((result) => {
        this.products = result.data.category.products;
        this.setState({ ...this.state });
      });
  }

  setStateFromChildComponent(obj) {
    this.setState({ ...this.state, ...obj });
  }

  // choosing currency from currency switching menu
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

  render() {
    return (
      <>
        <Head
          productInCard={this.state.productInCard}
          currency={this.state.currency}
          productData={this.products}
          chooseCurrency={this.chooseCurrency}
          changeItemQuantity={this.changeItemQuantity}
          closeCurrencyMenuFromOutside={this.closeCurrencyMenuFromOutside}
        />
        <Main
          {...this.state}
          client={this.client}
          queryProductData={this.queryProductData}
          products={this.products}
          setStateFromChildComponent={this.setStateFromChildComponent}
          categories={this.categories}
          closeCurrencyMenuFromOutside={this.closeCurrencyMenuFromOutside}
        />
      </>
    );
  }
}

export default <App />;
