import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
// import BookPage from "./components/bookPage/BookPage";
import PaymentPage from './components/ShoppingCart/PaymentPage';
// import {Button} from '@mui/material';
import AuthorContextProvider from "./contexts/authorContext";
import HomePage from "./components/homepage/HomePage.js";
import { ShoppingContext } from './contexts/shoppingContext';
import { useContext, useEffect } from 'react'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "@mui/material";
import AuthorSearch from "./components/bookPage/AuthorSearch";
import BookSearch from "./components/bookPage/BookSearch";
import GenreSearch from "./components/bookPage/GenreSearch";
import BestSellersPage from "./components/BestSellers";


function App() {
  const { setCart } = useContext(ShoppingContext);

  useEffect(() => {
    setCart([
      {
        title: "Fantastic Mr. Fox",
        isbn: "9780140328721",
        amount: 3,
      },
      {
        title: "The Lord of The Rings",
        isbn: "0261102303",
        amount: 1,
      },
    ]); // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <AuthorContextProvider>
        <HomePage/>
        <Routes>
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          {/* <Route path="/book-info" element={<BookPage />} /> */}
          <Route path="/payment-page" element={<PaymentPage />} />
        </Routes>
      </AuthorContextProvider>

    </div>
  );
}

export default App;
