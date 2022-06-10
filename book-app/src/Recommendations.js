import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import Display from "./components/bookPage/Display";
import { useState } from "react";
import { useContext } from "react";
import { AuthorContext } from "./contexts/authorContext";
import Grid from '@mui/material/Grid';

const pages = [
  "Best Sellers",
  "Search by Title",
  "Search by Author",
  "Search by Subject",
  "Shopping Cart",
];

const Recommendations = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [titles, setTitles] = useState([]);
  const [keys, setKeys] = useState([]);
  const [ bookz, setBookz ] = useState([]);
  const bookTitles = [];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 720 },
      items: 3,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const urlKeys = [];
  const booksDiscovery = [];

  fetch(`http://openlibrary.org/search.json?author=david+ross`)
    .then((res) => res.json())
    .then((data) => {
      data.docs.forEach((e) => {
        urlKeys.push(e.key + ".json");
        booksDiscovery.push(e);
        console.log(e.first_publish_year);
      });
      setBookz(booksDiscovery);
      setKeys(urlKeys);
    })
    .catch((err) => console.log(err));




  return (
    <>
    <Typography
    variant="h5"
    noWrap
    sx={{
      mr: 2,
      display: { xs: 'flex', md: 'flex' },
      flexGrow: 1,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
      marginTop:"2rem"
    }}
  >
    Recommendations
    </Typography>
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
  </>
  );
};
export default Recommendations;