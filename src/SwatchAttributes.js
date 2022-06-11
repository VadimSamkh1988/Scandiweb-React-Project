import React from "react";
import SwatchAttributeButton from "./SwatchAttributeButton";

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
              <SwatchAttributeButton
                getProductAttributeValue={this.props.getProductAttributeValue}
                makeAttributeButtonActive={this.props.makeAttributeButtonActive}
                attr={this.props.attr}
                attrItem={item}
                key={`${this.props.attr.name + item.value}`}
              />
            );
          })}
        </div>
      </>
    );
  }
}
