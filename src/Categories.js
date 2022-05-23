import React from "react";
import { categories } from "./dataQueries";

export default class Categories extends React.Component {
  /* While rendering 'this.categories' array, this function is called to render each 'li' element with category name */
  showCategoryName(category) {
    return (
      <li
        className={
          category === this.props.category
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
    return (
      <ul
        className="categories-filter"
        onClick={this.props.closeCurrencyMenuFromOutside}>
        {categories.map((category) => {
          return this.showCategoryName(category);
        })}
      </ul>
    );
  }
}
