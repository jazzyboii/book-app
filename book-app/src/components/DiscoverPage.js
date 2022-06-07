import React from "react";
import { useContext } from "react";
import { AuthorContext } from "../contexts/authorContext";
import SearchBar from "./bookPage/SearchBar";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

function DiscoverPage(props) {
    const { name, author, isbn } = props
    //const isbn = props.data.isbn;
    let src = "https://covers.openlibrary.org/b/isbn/" + isbn + "-L.jpg";
  //const { author } = useContext(AuthorContext);

  return (
    <div>
                            <Card sx={{ maxWidth: 200}}>
                                <CardMedia
                                component="img"
                                height="160"
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
                                </CardContent>
                            </Card>

    </div>
  );
}

export default DiscoverPage;