import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ShoppingProvider from "./contexts/shoppingContext";
import DescriptionContextProvider from "./contexts/descriptionContext";
import AuthorContextProvider from "./contexts/authorContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ShoppingProvider>
      <AuthorContextProvider>
        <DescriptionContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DescriptionContextProvider>
      </AuthorContextProvider>
    </ShoppingProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
