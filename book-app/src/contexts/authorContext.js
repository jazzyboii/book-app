import React, { createContext, useState } from "react";
const AuthorContext = createContext("");

function AuthorContextProvider({ children }) {
  const [author, setAuthor] = useState("");
  const obj = { author: author, setAuthor: setAuthor };
  return <AuthorContext.Provider value={obj}>{children}</AuthorContext.Provider>;
}

export default AuthorContextProvider;
export { AuthorContext };
