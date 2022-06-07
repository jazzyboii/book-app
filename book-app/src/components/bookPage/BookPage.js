import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthorContext } from "../../contexts/authorContext";
import SearchBar from "./SearchBar";

function BookPage() {
  const { author } = useContext(AuthorContext);

  return (
    <div>
      <SearchBar />
    </div>
  );
}

export default BookPage;
