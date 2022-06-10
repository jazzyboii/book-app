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

import { useState } from "react";
import { useContext } from "react";
import { AuthorContext } from "../../contexts/authorContext";
import DiscoverPage from "../DiscoverPage";
import Grid from '@mui/material/Grid';
const pages = ['Discover', 'Book Page', 'Shopping Cart'];

const pages = [
  "Best Sellers",
  "Search by Title",
  "Search by Author",
  "Search by Subject",
  "Shopping Cart",
];

const HomePage = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [titles, setTitles] = useState([]);
  const [keys, setKeys] = useState([]);
  const [ bookz, setBookz ] = useState([]);
  const bookTitles = [];
  const urlKeys = [];
  const booksDiscovery = [];

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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();

  fetch(`http://openlibrary.org/search.json?author=david+ross`)
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

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right bottom, #ff8b01, #eb1c01)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: 40,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Nozama
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Nozama
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => navigate("/best-sellers")}
                sx={{
                  mx: 2,
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                  borderBlockColor: "white",
                  border: "2px white solid",
                }}
                variant="outlined"
              >
                Best Sellers
              </Button>
              <Button
                onClick={() => navigate("/author-search")}
                sx={{
                  mx: 2,
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                  borderBlockColor: "white",
                  border: "2px white solid",
                }}
                variant="outlined"
              >
                Search by Author
              </Button>
              <Button
                onClick={() => navigate("/title-search")}
                sx={{
                  mx: 2,
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                  borderBlockColor: "white",
                  border: "2px white solid",
                }}
                variant="outlined"
              >
                Search by Title
              </Button>
              <Button
                onClick={() => navigate("/genre-search")}
                sx={{
                  mx: 2,
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                  borderBlockColor: "white",
                  border: "2px white solid",
                }}
                variant="outlined"
              >
                Search by Subject
              </Button>
              <Button
                onClick={() => navigate("/shopping-cart")}
                sx={{
                  mx: 2,
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                  borderBlockColor: "white",
                  border: "2px white solid",
                }}
                variant="outlined"
              >
                Shopping Cart
              </Button>
            </Box>
          </Toolbar>          
        </Container>
      </AppBar>
      <Box
        sx={{
          width: 'auto',
          height: '50vh',
          backgroundColor: 'primary.dark',
          marginTop: "2rem"
        }}
      >
        <Typography variant="h4" sx={{marginTop:"2rem"}}>
          Nozama
        </Typography>
        <Typography variant="h4" sx={{marginTop:"2rem"}}>
           The finiest assortment of your favorite books for price of a $1
        </Typography>
      </Box>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
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
      <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={0}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          slidesToSlide={2}
          sliderClass=""            
        >        
        {bookz && bookz.map((val, key) => {
            if(key < 10){
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
            }else{
              return;
            }
         })
        }          
      </Carousel>    
    </>
  );
};
export default HomePage;
