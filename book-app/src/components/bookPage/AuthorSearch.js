import { Button, Typography, Box } from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";
import DiscoverPage from "../DiscoverPage";
import Grid from "@mui/material/Grid";
import { DescriptionContext } from "../../contexts/descriptionContext";

function AuthorSearch() {
  const [bookz, setBookz] = useState([]);
  const { first, setFirst, last, setLast } = useContext(AuthorContext);
  const { keys, setKeys } = useContext(DescriptionContext);

  const handleClick = () => {
    const urlKeys = [];
    const booksDiscovery = [];

    fetch(`http://openlibrary.org/search.json?author=${first}+${last}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          urlKeys.push(e.key + ".json");
          booksDiscovery.push(e);
        });
        setBookz(booksDiscovery);
        setKeys(urlKeys);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Typography sx={{ variant: "h3", color: "blue" }}>
        Search by Author
      </Typography>
      <TextField
        id="filled-basic"
        label="First Name"
        variant="filled"
        sx={{ m: 1}}
        onChange={(e) => setFirst(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Last Name"
        variant="filled"
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

export default AuthorSearch;
