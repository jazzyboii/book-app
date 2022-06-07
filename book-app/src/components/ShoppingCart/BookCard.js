import { Card, CardActionArea, CardContent, CardMedia, CardActions, Typography, Box, Button } from '@mui/material';

export default function BookCard(props) {
    const isbn = props.data.isbn;
    let src = "https://covers.openlibrary.org/b/isbn/" + isbn + "-L.jpg";

    return (
        <div className="topSong">
            <Card raised={true} sx={{ display: 'flex', width:"50%" }} className="bookCard" >
                <CardActionArea target="_blank"> 
                <CardMedia 
                    component = "img"
                    sx={{ width: 100, float:"right" }}
                    image = {src}
                    alt={props.data.title}
                />
                <Box  sx={{ display: 'flex', flexDirection: 'column', width:'70%'}}>
                    <CardContent className="topSongDescription" sx={{ flex: '1 0 auto' }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                <br></br>
                                {props.data.title}, $1
                            </Typography>
                            <br></br>
                            <Typography variant="body" color = "text.secondary" sx={{ fontWeight: 'bold', fontStyle: 'oblique' }}>
                                Amount: {props.data.amount}
                            </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small" >Add a Copy</Button>
                    </CardActions>
                </Box>
                </CardActionArea>
            </Card>
        </div>
    );
}