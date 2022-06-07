import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef, useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";

function SearchBar() {
  const [titles, setTitles] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isbn, setIsbn] = useState([]);
  const { first, setFirst, last, setLast } = useContext(AuthorContext);

  const handleClick = () => {
    const bookTitles = [];
    const urlKeys = [];
    const bookDesc = [];

    fetch(`http://openlibrary.org/search.json?author=${first}+${last}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          bookTitles.push(e.title);
          urlKeys.push(e.key + ".json");
        });
        setTitles(bookTitles);
        setKeys(urlKeys);
    });
  };

  return (
    <div>
      <p>
        <TextField
          id="filled-basic"
          label="First Name"
          variant="filled"
          onChange={(e) => setFirst(e.target.value)}
        />
      </p>
      <p>
        <TextField
          id="filled-basic"
          label="Last Name"
          variant="filled"
          onChange={(e) => setLast(e.target.value)}
        />
      </p>
      <p>
        <Button type="submit" variant="contained" onClick={handleClick}>
          Submit
        </Button>
      </p>
        <h1>Books</h1>
        {titles.map((val, key) => {
          return <p>{val}</p>;
        })}
    </div>
  );
}

export default SearchBar;
