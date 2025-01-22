import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </BrowserRouter>
);
