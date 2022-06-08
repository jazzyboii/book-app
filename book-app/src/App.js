import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import BookPage from "./components/bookPage/BookPage";
import AuthorContextProvider from "./contexts/authorContext";
import HomePage from "./components/homePage/HomePage";

function App() {
  return (
    <div className="App">
      <AuthorContextProvider>
        <HomePage/>
        <Routes>
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/book-info" element={<BookPage />} />
        </Routes>
      </AuthorContextProvider>
    </div>
  );
}

export default App;
