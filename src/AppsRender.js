import React from "react";
import Head from "./Head";
import ProductList from "./ProductList";
import Categories from "./Categories";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDescriptionPage from "./routes/ProductDescriptionPage";
import "./css/style.css";
import "./css/normalize.css";
import TotalProductBag from "./routes/TotalProductBag";

class AppsRender extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Head
          {...this.props.state}
          {...this.props}
          chooseCurrency={this.props.chooseCurrency}
          closeCurrencyMenuFromOutside={this.props.closeCurrencyMenuFromOutside}
          setStateFromChildComponent={this.props.setStateFromChildComponent}
          makeAttributeButtonActive={this.props.makeAttributeButtonActive}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Categories
                  category={this.props.state.category}
                  setCategory={this.props.setCategory}
                  closeCurrencyMenuFromOutside={
                    this.closeCurrencyMenuFromOutside
                  }
                />
                <ProductList
                  {...this.props.state}
                  products={this.props.data}
                  setStateFromChildComponent={
                    this.props.setStateFromChildComponent
                  }
                  closeCurrencyMenuFromOutside={
                    this.props.closeCurrencyMenuFromOutside
                  }
                />
              </>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDescriptionPage
                {...this.props.state}
                products={this.props.data}
                closeCurrencyMenuFromOutside={
                  this.props.closeCurrencyMenuFromOutside
                }
                setStateFromChildComponent={
                  this.props.setStateFromChildComponent
                }
                makeAttributeButtonActive={this.props.makeAttributeButtonActive}
              />
            }></Route>
            <Route
             path="/products/total-product-bag"
             element={ 
              <TotalProductBag productInCard = {this.props.state.productInCard} {...this.props}/>}
            />
          <Route
            path="*"
            element={
              <h2
                className="page-not-found"
                onClick={this.props.closeCurrencyMenuFromOutside}>
                Opps!There is nothing here...
              </h2>
            }></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppsRender;
