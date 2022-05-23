import { gql } from "@apollo/client";

const query = gql `
  query {
    category(input: { title: "all" }) {
      products {
        category
        gallery
        name
        brand
        id
        inStock
        description
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            id
            value
          }
        }
      }
    }
  }
`;

export default query;