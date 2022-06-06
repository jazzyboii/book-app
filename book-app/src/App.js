import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to='/shopping-cart'>Shopping Cart</Link> 
      </nav>

      <Routes>
        <Route path='/shopping-cart' element={<ShoppingCart/>} />
      </Routes>
      
    </div>
  );
}

export default App;
