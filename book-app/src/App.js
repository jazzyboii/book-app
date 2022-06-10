import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import PaymentPage from "./components/ShoppingCart/PaymentPage";
// import {Button} from '@mui/material';
import AuthorContextProvider from "./contexts/authorContext";
import HomePage from "/Users/davidvincent/Desktop/book-app/book-app/src/components/homePage/HomePage.js";
import { ShoppingContext } from './contexts/shoppingContext';
import { useContext, useEffect } from 'react'
import DiscoverPage from './components/DiscoverPage'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "@mui/material";
import AuthorSearch from "./components/bookPage/AuthorSearch";
import BookSearch from "./components/bookPage/BookSearch";
import GenreSearch from "./components/bookPage/GenreSearch";
import BestSellersPage from "./components/BestSellers";



function App() {
  // const { setCart } = useContext(ShoppingContext);

  // useEffect(() => {
  //   setCart([
  //     {
  //       title: "Fantastic Mr. Fox",
  //       isbn: "9780140328721",
  //       amount: 3,
  //     },
  //     {
  //       title: "The Lord of The Rings",
  //       isbn: "0261102303",
  //       amount: 1,
  //     },
  //   ]); // eslint-disable-next-line
  // }, []);

  return (
    <div className="App">
      <HomePage />
      <Routes>
        <Route path="/best-sellers" element={<BestSellersPage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/author-search" element={<AuthorSearch />} />
        <Route path="/title-search" element={<BookSearch />} />
        <Route path="/genre-search" element={<GenreSearch />} />
        <Route path="/payment-page" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}

export default App;
