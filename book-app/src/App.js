import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import PaymentPage from "./components/ShoppingCart/PaymentPage";
// import {Button} from '@mui/material';
import HomePage from "./components/homePage/HomePage";
import { ShoppingContext } from "./contexts/shoppingContext";
import { useContext, useEffect } from "react";
import AuthorSearch from "./components/bookPage/AuthorSearch";
import BookSearch from "./components/bookPage/BookSearch";
import GenreSearch from "./components/bookPage/GenreSearch";
import DiscoverPage from "./components/DiscoverPage";
import CarouselDisplay from "./components/homePage/CarouselDisplay";
import CarouselBooks from "./components/homePage/CarouselBooks";

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
      <HomePage />
      <Routes>
        <Route path="/" element={<CarouselBooks />} />
        <Route path="/discover" element={<DiscoverPage />} />
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
