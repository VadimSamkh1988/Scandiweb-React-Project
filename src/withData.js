import React from "react";
import { Component } from "react";
import { client } from "./dataQueries";

// creating HOC to fetch data and pass it to component
export const withData = (query) => (DumbComponent) => {
  return class EnchancedComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { data: [] };
    }

    componentDidMount() {
      // fetching product data from API
      client
        .query({
          query,
        })
        .then((result) => {
          this.setState({ data: result.data.category.products });
        });
    }

    render() {
      return <DumbComponent {...this.props} {...this.state} />;
    }
  };
};
