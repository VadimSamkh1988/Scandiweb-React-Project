import React from "react";
import Product from "./Product";

export default class ProductList extends React.Component {
  // sorting productst by categories and creating product card
  getProductComponent() {
    return this.props.products.map((product) => {
      if (
        product.category === this.props.category ||
        this.props.category === "all"
      )
        return <Product key={product.id} {...product} {...this.props} />;
    });
  }

  render() {
    if (this.props.products.length) {
      return <>{this.getProductComponent()}</>;
    }

    this.props.queryProductData();
    return <h2>Loading products...</h2>;
  }
}
