import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import BookPage from "./components/bookPage/BookPage";
import {Button} from '@mui/material';
import AuthorContextProvider from "./contexts/authorContext";
import ShoppingProvider from './contexts/shoppingContext';

function App() {
  return (
    <div className="App">
      <ShoppingProvider>
      <AuthorContextProvider>
        <nav>
          <button>
            <Link to="/shopping-cart">Shopping Cart</Link>
          </button>
          <p>
            <Link to="/book-info">Book Info</Link>
          </p>
        </nav>

        <Routes>
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/book-info" element={<BookPage />} />
        </Routes>
        
      </AuthorContextProvider>
      </ShoppingProvider>
    </div>
  );
}

export default App;
