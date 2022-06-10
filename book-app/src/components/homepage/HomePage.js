import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";
import { MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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

  const Search = styled("div")(({ theme }) => ({
    position: "sticky",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

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
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Noz ama
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
    </>
  );
};
export default HomePage;
