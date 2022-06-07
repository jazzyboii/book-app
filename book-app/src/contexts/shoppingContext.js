import React, { createContext, useState } from 'react';

const ShoppingContext = createContext({
    cart: [],
    setCart: () => {}
});

const ShoppingProvider = ({children}) => {
    const [cart, setCart] = useState([
        {
          title: 'Fantastic Mr. Fox',
          isbn: "9780140328721",
          amount: 2
        },
        {
          title: 'The Lord of The Rings',
          isbn: "0261102303",
          amount: 3
        },
      ]
    );

    const obj = { 
        cart: cart, 
        setCart: setCart
    }

    return (
      <ShoppingContext.Provider value={obj}>
        {children}
      </ShoppingContext.Provider>
    );
  };

export default ShoppingProvider;
export { ShoppingContext };