import React from "react";
import { Component } from "react/cjs/react.development";
import { ProductContext } from "./ProductContext";

export default class ProductContextProvider extends Component {
  render() {
    const { children } = this.props;
    return (
      <ProductContext.Provider value="context provided">
        {children}
      </ProductContext.Provider>
    );
  }
}
