import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import BookPage from "./components/bookPage/BookPage";
import AuthorContextProvider from "./contexts/authorContext";

function App() {
  return (
    <div className="App">
      <AuthorContextProvider>
        <nav>
          <p>
            <Link to="/shopping-cart">Shopping Cart</Link>
          </p>
          <p>
            <Link to="/book-info">Book Info</Link>
          </p>
        </nav>

        <Routes>
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/book-info" element={<BookPage />} />
        </Routes>
      </AuthorContextProvider>
    </div>
  );
}

export default App;
