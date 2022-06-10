import React, { createContext, useState, useEffect } from "react";

const ShoppingContext = createContext();
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

const ShoppingProvider = ({ children }) => {
  const [cart, setCart] = useState(cartFromLocalStorage);

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
