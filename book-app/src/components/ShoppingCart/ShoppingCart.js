import { useEffect, useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, CardActions, Typography, Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import BookCard from "./BookCard";

export default function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const [deleteId, setDeleteId] = useState();
    const [wantsToDelete, setWantsToDelete] = useState(false);
    const [reloadData, setReloadData] = useState(true);


    useEffect( () => {
            if (reloadData) {
                fetch("http://localhost:9000/shopping/info")
                .then((res) => res.json())
                .then((text) => {
                    console.log("ShoppingCard: ", text)
                    setCart(text.result)
                    })
                    .then(setReloadData(false))
                .catch((err) => console.log(err))
                }
        }, [reloadData])

    function handleOpen() {
        setWantsToDelete(true);
    }

    function handleClose() {
        setWantsToDelete(false);
    }

    
    function deleteBook(id) {
        setWantsToDelete(false);
        fetch("http://localhost:9000/shopping/delete/" + id, {
            method: 'DELETE',
        })
        .then(setReloadData(true))
        .catch((err) => console.log(err))
    }

    return (
        <>
            <p>you are at the shopping cart</p>

            {cart && cart.map( (book) => 
            <div key={book.id}>

                <div className="topSong" key={book.id}>
                    <Card raised={true} sx={{ display: 'flex', width:"50%" }} className="bookCard" >
                        <CardActionArea target="_blank"> 
                            <CardMedia 
                                component = "img"
                                sx={{ width: 100, float:"right" }}
                                image = {"https://covers.openlibrary.org/b/isbn/" + book.isbn + "-L.jpg"}
                                alt={book.title}
                            />
                            <Box  sx={{ display: 'flex', flexDirection: 'column', width:'70%'}}>
                                <CardContent className="topSongDescription" sx={{ flex: '1 0 auto' }}>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                        <br></br>
                                        {book.title}, $1
                                    </Typography>
                                        <br></br>
                                    <Typography variant="body" color = "text.secondary" sx={{ fontWeight: 'bold', fontStyle: 'oblique' }}>
                                        Amount: {book.amount}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small" >Add a Copy</Button>
                                    {book.amount>1?<Button>Remove a copy</Button>:<></>}
                                    <Button size="small" onClick={() => {
                                        handleOpen()
                                        setDeleteId(book.id)
                                        }}> Delete </Button>
                                </CardActions>
                            </Box>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
            )}

            <Dialog
                open={wantsToDelete}
                onClose={handleClose}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to Delete this book?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => {deleteBook(deleteId)}} autoFocus color="error">
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

// <div key={book.id}>
//                 <p >{book.title}</p>
//                 <BookCard data = {book}/>
//             </div>)