import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
} from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";

function SearchBar() {
  const [titles, setTitles] = useState([]);
  const [keys, setKeys] = useState([]);
  const [description, setDescription] = useState([]);
  const { first, setFirst, last, setLast } = useContext(AuthorContext);

  const handleClick = () => {
    const bookTitles = [];
    const urlKeys = [];

    fetch(`http://openlibrary.org/search.json?author=${first}+${last}`)
      .then((res) => res.json())
      .then((data) => {
        data.docs.forEach((e) => {
          bookTitles.push(e.title);
          urlKeys.push(e.key + ".json");
        });
        setTitles(bookTitles);
        setKeys(urlKeys);
      });
  };

  useEffect(() => {
    const desc = [];
    keys.forEach((element) => {
      fetch(`https://openlibrary.org${element}`)
        .then((res) => res.json())
        .then((data) => {
          try {
            if (data.description && data.description.value) {
              desc.push(data.description.value);
            } else if (data.description) {
              desc.push(data.description);
            } else {
              desc.push("No description");
            }
          } catch (e) {
            console.error(e);
          }
        });
    });
    setDescription(desc);
  }, []);

  description.forEach((e) => {
      console.log(e)
  })

  return (
    <div>
        <Typography sx={{variant: "h3", color: 'blue'}}>
            Enter Author's Name
        </Typography>
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
      {titles.map((val, key) => {
        return (
          <Card sx={{ minWidth: 700, display: 'inline-block' }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {key + 1}
              </Typography>
              <Typography noWrap variant="h5" component="div">
                {val}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {first} {last}
              </Typography>
              <Typography variant="body2">{description[key]}</Typography>
            </CardContent>
            <CardActions>
              <Button sx={{size: 'small', mx: 'auto'}}>Learn More</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default SearchBar;
