import React from "react";

export default class ChangeItemQuantityButton extends React.Component {
  render() {
    return (
      <button
        className={this.props.className}
        data-sigh={this.props.dataSigh}
        onClick={(e) => {
          this.props.changeItemQuantity(e, this.props.attributesCollection);
        }}>
        {this.props.dataSigh}
      </button>
    );
  }
}
