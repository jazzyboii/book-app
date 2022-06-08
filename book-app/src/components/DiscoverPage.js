import React, { useContext, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function DiscoverPage(props) {
  const { name, author, isbn, urlKey } = props;
  let src = "https://covers.openlibrary.org/b/isbn/" + isbn + "-L.jpg";
  let url = "https://openlibrary.org" + urlKey;

  const showAlert=(e) => {
    var text = e.currentTarget.value + " was added to cart!"
    alert(text)
  }

  return (
    <div>
      <Card sx={{ maxWidth: 250, minHeight: 400 }}>
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
            sx={{ m: 2 }}
            onClick={showAlert}
          >
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default DiscoverPage;
