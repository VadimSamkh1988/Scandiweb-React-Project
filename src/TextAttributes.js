import React from "react";
import TextAttributeButton from "./TextAttributeButton";

export default class TextAttributes extends React.Component {
  render() {
    return (
      <>
        <span className="product-page-text-title">{this.props.attr.name}:</span>
        <div className="product-page-text">
          {this.props.attr.items.map((item) => {
            return (
              <TextAttributeButton
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
