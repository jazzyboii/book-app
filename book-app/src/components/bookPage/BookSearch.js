import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Grid, Box } from "@mui/material";
import Display from "./Display";

function BookSearch() {
  const [title, setTitle] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const handleClick = () => {
    const books = [];
    const titleArray = title.trim().split(/\s+/);
    const urlTitle = titleArray.join("+");

    fetch(`http://openlibrary.org/search.json?title=${urlTitle}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          books.push(e);
        });
        setAllBooks(books);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Search by Title</h1>
      <TextField
        id="filled-basic"
        label="Title"
        variant="filled"
        sx={{ m: 1 }}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>
        <Button type="submit" variant="contained" onClick={handleClick}>
          Submit Title
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
                  margin: ".25rem",
                }}
              >
                <Display
                  name={val.title}
                  author={val.author_name && val.author_name[0]}
                  isbn={val.isbn && val.isbn[0]}
                  urlKey={val.key}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default BookSearch;
