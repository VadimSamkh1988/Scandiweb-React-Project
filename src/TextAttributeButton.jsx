import React from "react";

export default class AttributeButton extends React.Component {
  render() {
    return (
      <button
        className="text-attribute"
        data-attribute-value={this.props.attrItem.value}
        data-attribute-type={this.props.attr.type}
        data-attribute-name={this.props.attr.name.toLowerCase()}
        onClick={(e) => {
          this.props.getProductAttributeValue(e);
          this.props.makeAttributeButtonActive(e);
        }}>
        {this.props.attrItem.value}
      </button>
    );
  }
}
