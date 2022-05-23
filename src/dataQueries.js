import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});
const categories = [];
const dataQuery = gql `
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

const categoryQuery = gql `
  {
    categories {
      name
    }
  }
`;

client
    .query({
        query: categoryQuery,
    })
    .then((result) => {
        result.data.categories.forEach((category) => {
            categories.push(category.name);
        });
    });

export { client, categories, dataQuery };