import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import {Button} from '@mui/material';

function App() {
  return (
    <div className="App">
      <nav>
        <ShoppingCartIcon> <Button> <Link to='/shopping-cart'>Shopping Cart</Link></Button> </ShoppingCartIcon>
        <Link to='/shopping-cart'>Shopping Cart</Link>
      </nav>

      <Routes>
        <Route path='/shopping-cart' element={<ShoppingCart/>} />
      </Routes>
      
    </div>
  );
}

export default App;
