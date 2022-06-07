import React from "react";
import { useState } from "react";
import { useRef, useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";

function SearchBar() {
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const titles = [];
  const keys = [];
  const { first, setFirst, last, setLast } = useContext(AuthorContext);

  const handleClick = () => {
    setFirst(firstRef.current.value);
    setLast(lastRef.current.value);

    console.log(first);
    console.log(last);

    fetch(`http://openlibrary.org/search.json?author=${first}+${last}`)
      .then((res) => res.json())
      .then((data) => {
          console.log(data)
        data.docs.forEach((e) => {
          titles.push(e.title)
          keys.push(e.key+'.json')
        });
      });
  };

  return (
    <div>
      <input type="text" placeholder="first name" ref={firstRef} />
      <input type="text" placeholder="last name" ref={lastRef} />
      <p>
        <input type="submit" onClick={handleClick} />
      </p>
    </div>
  );
}

export default SearchBar;
