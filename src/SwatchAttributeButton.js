import React from "react";

export default class SwatchAttributeButton extends React.Component {
  render() {
    return (
      <button
        className="swatch-attribute"
        style={{ backgroundColor: `${this.props.attrItem.value}` }}
        data-attribute-value={this.props.attrItem.value}
        data-attribute-type={this.props.attr.type}
        data-attribute-name={this.props.attr.name.toLowerCase()}
        onClick={(e) => {
          this.props.getProductAttributeValue(e);
          if (!e.target.classList.contains("swatch-attribute-active")) {
            this.props.makeAttributeButtonActive(e);
          }
        }}
      />
    );
  }
}
