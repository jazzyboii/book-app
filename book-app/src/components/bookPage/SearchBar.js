import React from "react";
import { useState } from "react";
import { useRef, useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";

function SearchBar() {
  const authorRef = useRef(null);
  const titles = [];
  const { author, setAuthor } = useContext(AuthorContext);

  const handleClick = () => {
    setAuthor(authorRef.current.value);

    fetch(`http://openlibrary.org/search.json?author=${author}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          titles.push(e.title);
        });
        console.log(titles);
      })
      .catch((err) => console.log(err));

      titles && titles.map((val, key) => {
          return (
            <p>{key + 1}. {val}</p>
          )
      })
  };

  return (
    <div>
      <input type="text" placeholder="first name" />
      <input type="text" placeholder="last name" ref={authorRef} />
      <p>
        <input type="submit" onClick={handleClick} />
      </p>
    </div>
  );
}

export default SearchBar;
