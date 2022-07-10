import React from "react";
import AddToCardButton from "../AddToCardButton";
import ProductCardGalleryImage from "../ProductCardGalleryImage";
import ProductCardMainImage from "../ProductCardMainImage";

export default class ProductDescriptionPageRender extends React.Component {
  render() {
    return (
      <section
        className="product-page-content"
        onClick={this.props.closeCurrencyMenuFromOutside}>
        <aside className="product-page-gallery">
          {this.props.product.gallery.map((img) => {
            return <ProductCardGalleryImage img={img} key={img} />;
          })}
        </aside>

        <main className="product-page-description-container">
          <ProductCardMainImage
            productMainImage={this.props.product.gallery[0]}
          />

          <div className="product-page-description">
            <span className="product-page-brand">
              {this.props.product.brand}
            </span>

            <br />
            <span className="product-page-name">{this.props.product.name}</span>

            <div className="product-page-attributes">
              {this.props.showAttributesIfpresent()}
              <span className="product-page-price-title"> Price </span> <br />
              <span className="product-page-price">
                {this.props.currency}

                {
                  this.props.product.prices.find(
                    (item) => item.currency.symbol === this.props.currency
                  ).amount
                }
              </span>
              <br />
              <AddToCardButton
                label={
                  this.props.product.inStock ? "add to card" : "out of stock"
                }
                product={this.props.product}
                productAttributes={this.props.productAttributes}
                productInCard={this.props.productInCard}
                setStateFromChildComponent={
                  this.props.setStateFromChildComponent
                }
                totalQuantityOfProductsInCard={
                  this.props.totalQuantityOfProductsInCard
                }
              />
              <p className="product-attributes-required-label product-page-attributes-required">
                Please, specify product attributes like color, size, etc
              </p>
              <div className="product-page-description-text"> </div>
            </div>
          </div>
        </main>
      </section>
    );
  }
}
