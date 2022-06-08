import React, { createContext, useState } from "react";
const DescriptionContext = createContext("");

function DescriptionContextProvider({ children }) {
  const [keys, setKeys] = useState([]);
  const obj = {
    keys: keys,
    setKeys: setKeys,
  };
  return (
    <DescriptionContext.Provider value={obj}>{children}</DescriptionContext.Provider>
  );
}

export default DescriptionContextProvider;
export { DescriptionContext };