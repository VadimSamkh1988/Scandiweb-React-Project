import React from "react";

export default class TextAttributes extends React.Component {
  render() {
    return (
      <>
        <span className="product-page-size-title">{this.props.attr.name}:</span>
        <div className="product-page-size">
          {this.props.attr.items.map((item) => {
            return (
              <button
                className="size-attribute"
                key={item.id}
                onClick={() =>
                  this.props.getProductAttributeValue({
                    name: this.props.attr.name.toLowerCase(),
                    value: item.id.toLowerCase(),
                  })
                }>
                {item.value}
              </button>
            );
          })}
        </div>
      </>
    );
  }
}
