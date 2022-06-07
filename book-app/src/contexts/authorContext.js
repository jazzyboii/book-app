import React, { createContext, useState } from "react";
const AuthorContext = createContext("");

function AuthorContextProvider({ children }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const obj = {
    first: first,
    setFirst: setFirst,
    last: last,
    setLast: setLast,
  };
  return (
    <AuthorContext.Provider value={obj}>{children}</AuthorContext.Provider>
  );
}

export default AuthorContextProvider;
export { AuthorContext };
