import React from "react";
import { useState } from "react";
import { useRef, useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";
import DiscoverPage from "../DiscoverPage";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

function SearchBar() {
  const authorRef = useRef(null);
  const [ titlez, setTitlez ] = useState([])
  const [ bookz, setBookz ] = useState([])
  const { author, setAuthor } = useContext(AuthorContext);

  const handleClick = () => {
    setAuthor(authorRef.current.value);
    const titles = [];
    const books = [];
    fetch(`http://openlibrary.org/search.json?author=${author}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          titles.push(e.title);
          books.push(e)
        });
        console.log(books);
      })
      .then(data => setTitlez(titles))
      .then(data => setBookz(books))
      .catch((err) => console.log(err));
      
/*
      titles && titles.map((val, key) => {
          return (
            <p>{key + 1}. {val}</p>
          )
      })
      */
  };

  return (
    <div>
      <input type="text" placeholder="first name" />
      <input type="text" placeholder="last name" ref={authorRef} />
      <p>
        <input type="submit" onClick={handleClick} />
      </p>
      <Grid container>
            {bookz && bookz.map((val, key) => 
                    <Grid item xs={12} sm={2}>
                        <Box style = {{
                            flex: '1',
                            padding:'20',
                            margin:'.25rem',
                            border: '15px solid white'
                        }}>
                        <DiscoverPage name={val.title} author={val.author_name && val.author_name[0]} isbn={val.isbn && val.isbn[0]}/>
                        </Box>
                    </Grid>
                
                )
            }
      </Grid>
    </div>
  );
}

export default SearchBar;
