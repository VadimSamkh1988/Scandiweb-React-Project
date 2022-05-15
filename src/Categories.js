import React from "react";
import { gql } from "@apollo/client";

export default class Categories extends React.Component {
  // stores all category
  categories = [];

  /* Receiving category data from API when the component is rendering for the first time */
  fetchCategoryData() {
    this.props.client
      .query({
        query: gql`
          {
            categories {
              name
            }
          }
        `,
      })
      .then((result) => {
        result.data.categories.forEach((category) => {
          this.categories.push(category.name);
        });
      });
  }

  /* While rendering 'this.categories' array, this function is called to render each 'li' element with category name */
  showCategoryName(category) {
    return (
      <li
        className={
          category === "all"
            ? "categories-filter-item active-category"
            : "categories-filter-item"
        }
        data-category-name={category}
        key={category}
        onClick={(e) => this.props.setCategory(e)}>
        {category}
      </li>
    );
  }

  render() {
    if (!this.categories.length) this.fetchCategoryData();

    return (
      <ul
        className="categories-filter"
        onClick={this.props.closeCurrencyMenuFromOutside}>
        {this.categories.map((category) => {
          return this.showCategoryName(category);
        })}
      </ul>
    );
  }
}
