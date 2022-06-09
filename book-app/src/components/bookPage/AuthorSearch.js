import { Button, Typography, Box } from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";
import Display from "./Display";
import Grid from "@mui/material/Grid";
import { DescriptionContext } from "../../contexts/descriptionContext";
import { ShoppingContext } from "../../contexts/shoppingContext";

function AuthorSearch() {
  const [bookz, setBookz] = useState([]);
  const { first, setFirst, last, setLast } = useContext(AuthorContext);
  const { keys, setKeys } = useContext(DescriptionContext);
  const { cart } = useContext(ShoppingContext)

  const handleClick = () => {
    const urlKeys = [];
    const booksDiscovery = [];

    fetch(`http://openlibrary.org/search.json?author=${first}+${last}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          urlKeys.push(e.key + ".json");
          booksDiscovery.push(e);
          console.log(e.first_publish_year)
        });
        setBookz(booksDiscovery);
        setKeys(urlKeys);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>
        Search by Author
      </h1>
      <TextField
        id="filled-basic"
        label="First Name"
        variant="filled"
        required
        sx={{ m: 1}}
        onChange={(e) => setFirst(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Last Name"
        variant="filled"
        required
        sx={{ m: 1 }}
        onChange={(e) => setLast(e.target.value)}
      />
      <p>
        <Button type="submit" variant="contained" onClick={handleClick}>
          Submit Author
        </Button>
      </p>
      <Grid container>
        {bookz &&
          bookz.map((val, k) => (
            <Grid item xs={12} sm={2}>
              <Box
                style={{
                  flex: "1",
                  margin: ".25rem",
                }}
              >
                <Display
                  name={val.title}
                  author={val.author_name && val.author_name[0]}
                  isbn={val.isbn && val.isbn[0]}
                  urlKey={val.key}
                  publishDate={val.first_publish_year}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default AuthorSearch;
