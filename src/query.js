import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const PRODUCTS_LIST = gql`
  {
    category {
      products {
        name
      }
    }
  }
`;

function App() {
  return (
    <div>
      <h2>My first Apollo app</h2>
      <ShowProducts />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

function ShowProducts() {
  const { loading, error, data } = useQuery(PRODUCTS_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return data.category.products.map((item, index) => (
    <div key={index}>
      <p>
        {item.__typename}: {item.name}
      </p>
    </div>
  ));
}
