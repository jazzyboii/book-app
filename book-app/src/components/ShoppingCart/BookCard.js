import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

export default function BookCard(props) {
    const isbn = props.data.isbn;
    let src = "https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg";

    return (
        <div className="topSong">
            <Card raised={true} className="songCard" >
                <CardActionArea target="_blank"> 
                <CardMedia 
                    component = "img"
                    image = {src}
                    height="300px"
                    alt={props.data.title}
                />
                    <CardContent className="topSongDescription" sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
                            <Typography gutterBottom variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                                <br></br>
                                {props.data.title}, $1
                            </Typography>
                            <br></br>
                            <Typography variant="h5" color = "text.secondary" sx={{ fontWeight: 'bold', fontStyle: 'oblique' }}>
                                Amount: {props.data.amount}
                            </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}