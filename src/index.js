// import { StrictMode } from "react";
// import { createRoot } from "react-dom"

import { render } from "react-dom"
import App from "./App";
import { withData } from "./withData";
import { dataQuery } from "./dataQueries";

// using HOC to fetch product data
const withProducts = withData(dataQuery);
const ListWithProducts = withProducts(App);

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//     <StrictMode>
//         <ListWithProducts/>
//     </StrictMode>
// )

render(<ListWithProducts />, document.getElementById("root")); 