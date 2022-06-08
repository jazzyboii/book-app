import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
  const [titles, setTitles] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isbn, setIsbn] = useState([]);
  const [ bookz, setBookz ] = useState([]);
  const { first, setFirst, last, setLast } = useContext(AuthorContext);

  const handleClick = () => {
    const bookTitles = [];
    const urlKeys = [];
    const bookDesc = [];
    const booksDiscovery = [];

    fetch(`http://openlibrary.org/search.json?author=${first}+${last}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          bookTitles.push(e.title);
          urlKeys.push(e.key + ".json");
          booksDiscovery.push(e);
        });
        setBookz(booksDiscovery);
        setTitles(bookTitles);
        setKeys(urlKeys);
      });
      //.catch((err) => console.log(err));
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


/*
      
        {titles.map((val, key) => {
          return <p>{val}</p>;
        })}
*/

export default SearchBar;
