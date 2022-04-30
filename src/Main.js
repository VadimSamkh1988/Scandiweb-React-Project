import React from "react";
import ProductList from "./ProductList";
import Categories from "./Categories";

export default class Main extends React.Component {
  constructor() {
    super();
    this.setCategory = this.setCategory.bind(this);
  }

  /* set category name to either "all", or one of those coming from API*/
  setCategory(e) {
    const categories = document.querySelectorAll(".categories-filter-item");

    [...categories]
      .filter((item) => item !== e.target)
      .forEach((item) => item.classList.remove("active-category"));

    e.target.classList.add("active-category");

    if (this.props.category !== e.target.dataset.categoryName)
      this.props.setStateFromChildComponent({
        category: e.target.dataset.categoryName,
      });
  }

  render() {
    return (
      <>
        <div className="background-layout"> </div>

        <section
          className="main-content"
          onClick={this.props.closeCurrencyMenuFromOutside}>
          <Categories
            setCategory={this.setCategory}
            client={this.props.client}
          />
          <ProductList {...this.props} />
        </section>
      </>
    );
  }
}
