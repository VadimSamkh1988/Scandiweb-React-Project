import React from "react";

export default class SwatchAttributes extends React.Component {
  render() {
    return (
      <>
        <span className="product-page-color-title">
          {this.props.attr.name}:
        </span>
        <div className="product-page-color">
          {this.props.attr.items.map((item) => {
            return (
              <button
                key={item.id}
                className="color-attribute"
                style={{ backgroundColor: `${item.value}` }}
              />
            );
          })}
        </div>
      </>
    );
  }
}
