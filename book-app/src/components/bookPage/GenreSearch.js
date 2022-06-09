import React, { useState, useContext, useEffect } from "react";
import { Typography, TextField, Button, Grid, Box } from "@mui/material";
import Display from "./Display";

function GenreSearch() {
  const [genre, setGenre] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const handleClick = () => {
    const books = [];
    const genreArray = genre.trim().split(/\s+/);
    const genreUrl = genreArray.join("+");

    fetch(`http://openlibrary.org/subjects/${genreUrl}.json`)
      .then((res) => res.json())
      .then((data) => {
        data.works.forEach((e) => {
          books.push(e);
        });
        setAllBooks(books);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Search by Subject</h1>
      <TextField
        id="filled-basic"
        label="Subject"
        variant="filled"
        sx={{ m: 1 }}
        required
        onChange={(e) => setGenre(e.target.value)}
      />
      <p>
        <Button type="submit" variant="contained" onClick={handleClick}>
          Submit Subject
        </Button>
      </p>
      <Grid container>
        {allBooks &&
          allBooks.map((val, k) => (
            <Grid item xs={12} sm={2}>
              <Box
                style={{
                  flex: "1",
                  padding: "20",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "20px"
                  
                }}
              >
                <Display
                  name={val.title}
                  author={val.authors && val.authors[0].name}
                  isbn={val.availability.isbn}
                  urlKey={val.key}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default GenreSearch;
