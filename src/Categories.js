import React from "react";

export default class Categories extends React.Component {
  render() {
    return (
      <ul className="categories-filter">
        {this.props.categories.map((category) => {
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
        })}
      </ul>
    );
  }
}
