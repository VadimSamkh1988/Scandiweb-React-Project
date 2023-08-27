import React from "react";
import TextAttributes from "./TextAttributes"
import SwatchAttributes from "./SwatchAttributes";

class ProductInBag extends React.Component{

    constructor(props) {
        super(props);
    
        this.product =
          this.props.data.find(
            (product) => product.id === this.props.product.id)
    
        // this.getProductAttributeValue = this.getProductAttributeValue.bind(this);
        // this.showAttributesIfpresent = this.showAttributesIfpresent.bind(this);
      }

    render(){

        console.log(this.product)
        return(
            <>
                <span className="product-page-brand">
                    {this.product.brand}
                </span>
                <span className="product-page-brand">
                    {this.product.id}
                </span>
                <span className="product-page-brand">
                    {this.props.currency}
                    {
                        this.props.data
                        .find(product=>product.id===this.product.id)
                        .prices
                        .find(price=>price.currency.symbol===this.props.currency).amount}
                </span>
                {this.product.attributes.map(attribute=>{if(attribute.type==="text")
                    return(<TextAttributes attr = {attribute}/>)
                    if(attribute.type==="swatch")
                    return( <SwatchAttributes attr={attribute}/>)
                    })
                }
            </>)
    }
}

export default ProductInBag