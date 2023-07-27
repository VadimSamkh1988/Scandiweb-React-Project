import App from "./App";
import { render } from "react-dom";
import { withData } from "./withData";
import { dataQuery } from "./dataQueries";

// using HOC to fetch product data
const withProducts = withData(dataQuery);
const ListWithProducts = withProducts(App);

render(<ListWithProducts />, document.getElementById("root"));
