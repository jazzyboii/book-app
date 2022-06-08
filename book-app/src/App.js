import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import PaymentPage from "./components/ShoppingCart/PaymentPage";
import { Button } from "@mui/material";
import { ShoppingContext } from "./contexts/shoppingContext";
import { useContext, useEffect } from "react";
import AuthorSearch from "./components/bookPage/AuthorSearch";
import BookSearch from "./components/bookPage/BookSearch";
import GenreSearch from "./components/bookPage/GenreSearch";

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
      <nav>
        <Button variant="outlined" sx={{ m: 2 }}>
          <Link to="/author-search">Search by Author</Link>
        </Button>
        <Button variant="outlined" sx={{ m: 2 }}>
          <Link to="/title-search">Search by Title</Link>
        </Button>
        <Button variant="outlined" sx={{ m: 2 }}>
          <Link to="/genre-search">Search by Subject</Link>
        </Button>
        <Button variant="outlined" sx={{ m: 2 }}>
          <Link to="/shopping-cart">Shopping Cart</Link>
        </Button>
      </nav>

      <Routes>
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/author-search" element={<AuthorSearch />} />
        <Route path="/title-search" element={<BookSearch />} />
        <Route path="/payment-page" element={<PaymentPage />} />
        <Route path="/genre-search" element={<GenreSearch />} />
      </Routes>
    </div>
  );
}

export default App;
