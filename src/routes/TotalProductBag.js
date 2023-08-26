import React from "react";
import { useParams } from "react-router-dom";
import CardOverlayProductDescription from "../CardOverlayProductDescription"
import CardOverlayProductCount from "../CardOverlayProductCount"

function withParams(Component) {
    return (props) => <Component params={useParams()} {...props} />;
  }

class TotalProductBag extends React.Component{
    
    render(){
    return(<h1 style={{textAlign: "center", height: "500px"}}>Work is in progress</h1>
//         <section className="bag-container">
//     <h2 className="bag-container-title">
//       CART
//       <span className="bag-items-quantity">
//         {`${this.props.productInCard
//           .map((product) => product.quantity)
//           .reduce(
//             (previousValue, currentValue) =>
//               previousValue + currentValue,
//             0
//           )} items`}
//       </span>
//     </h2>
//     {this.props.productInCard.map((product) => (
//       <>
//         <div className="bag-container-item">
//           <CardOverlayProductDescription
//             product={this.props.data.find(
//               (item) => item.id === product.id
//             )}
//             productInCard={this.props.productInCard}
//             attributesCollection={product.attributesCollection}
//             currency={this.props.currency}
//             makeAttributeButtonActive={
//               this.props.makeAttributeButtonActive
//             }
//             key={product.id}
//           />
//           <CardOverlayProductCount
//             changeItemQuantity={this.props.changeItemQuantity}
//             product={this.props.data.find(
//               (item) => item.id === product.id
//             )}
//             count={product.quantity}
//             id={product.id}
//             key={product.attributesCollection}
//             attributesCollection={product.attributesCollection}
//           />
//         </div>
//       </>
//     ))}
//   </section>
        )
    }
}

export default withParams(TotalProductBag);