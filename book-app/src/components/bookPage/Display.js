import React, { useContext, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { ShoppingContext } from "../../contexts/shoppingContext";

function Display(props) {
  const { name, author, isbn, urlKey } = props;
  const { cart, setCart } = useContext(ShoppingContext);

  let src = "https://covers.openlibrary.org/b/isbn/" + isbn + "-L.jpg";
  let url = "https://openlibrary.org" + urlKey;

  const addCart = (props) => {
    console.log(cart);
    if (cart === null) {
      setCart([{ title: name, isbn: isbn, amount: 1 }]);
    } else {
      setCart([
        ...cart,
        {
          title: name,
          isbn: isbn,
          amount: 1,
        },
      ]);
    }
    var text = name + " was added to cart!";
    alert(text);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <Card
        sx={{
          maxWidth: 300,
          minHeight: 400,
          ":hover": {
            boxShadow: 40,
          },
          margin: "auto",
          borderRadius: "20px",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          alt="No Photo Found"
          image={src}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By {author}
          </Typography>
          <a href={url} target="_blank">
            <Button>More Information</Button>
          </a>
          <Button
            variant="contained"
            value={name}
            sx={{
              m: 1,
            }}
            style={{
              borderRadius: 20,
              background: "linear-gradient(to right bottom, #ff8b01, #eb1c01)",
              padding: "15px",
              fontSize: "15px",
            }}
            onClick={() => addCart({ name }, { isbn })}
          >
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Display;
