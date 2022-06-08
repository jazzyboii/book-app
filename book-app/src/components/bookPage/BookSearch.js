import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import DiscoverPage from "../DiscoverPage";
import { Grid, Box } from "@mui/material";

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
      <Typography sx={{ variant: "h3", color: "blue" }}>
        Search by Title
      </Typography>
      <TextField
        id="filled-basic"
        label="Title"
        variant="filled"
        sx={{ m: 1 }}
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
                  border: "15px solid white",
                }}
              >
                <DiscoverPage
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
