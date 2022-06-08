import React, { createContext, useState } from "react";

const ShoppingContext = createContext();

const ShoppingProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const obj = {
    cart: cart,
    setCart: setCart,
  };

  return (
    <ShoppingContext.Provider value={obj}>{children}</ShoppingContext.Provider>
  );
};

export default ShoppingProvider;
export { ShoppingContext };
