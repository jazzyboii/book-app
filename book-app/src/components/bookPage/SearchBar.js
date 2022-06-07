import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef, useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";

function SearchBar() {
  const titles = [];
  const keys = [];
  const { first, setFirst, last, setLast } = useContext(AuthorContext);

  const handleClick = () => {
    console.log(first);
    console.log(last);

    fetch(`http://openlibrary.org/search.json?author=${first}+${last}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          titles.push(e.title);
          keys.push(e.key + ".json");
        });
        console.log(titles);
      });
  };

  //   useEffect(() => {
  //     titles.map((item) => {
  //       return <p key={item}>{item}</p>;
  //     });
  //   }, [first, last]);

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
      <div className="books">
        <h1>Books</h1>
        {titles.map((val, key) => {
          return <p>{val}</p>;
        })}
      </div>
    </div>
  );
}

export default SearchBar;
