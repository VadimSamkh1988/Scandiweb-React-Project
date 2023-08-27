import React from "react";
import { useParams } from "react-router-dom";
import  ProductInBag from "../ProductInBag"

function withParams(Component) {
    return (props) => <Component params={useParams()} {...props} />;
  }

class TotalProductBag extends React.Component{
    
    render(){
        
        if((!this.props.productInCard)||this.props.productInCard.length === 0) return (
            <h2 style={{textAlign: "center"}}>Bag is empty</h2>
        )

        return(
            <>
                <h2 className = "product-page-content" style={{textAlign: "left", textTransform: "uppercase"}}>cart</h2>
                {this.props.productInCard.map(
                product=>(<ProductInBag {...this.props} product = {product}/>))} 
                <button className="product-page-add-to-card">
                    <span style={{textTransform: "uppercase"}}>order</span>
                </button>
            </>)

           }      
}
    
export default withParams(TotalProductBag);