import { useEffect, useState, useContext} from "react";
import { Card, CardActionArea, CardContent, CardMedia, CardActions, Typography, Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ShoppingContext } from "../../contexts/shoppingContext";
import PriceCard from "./PriceCard";
// import TextField from '@mui/material/TextField';
// import BookCard from "./BookCard";


export default function ShoppingCart() {
    const {cart, setCart} = useContext(ShoppingContext);
    const [array, setArray] = useState([]);
    const [deleteId, setDeleteId] = useState();
    const [wantsToDelete, setWantsToDelete] = useState(false);
    const [reloadData, setReloadData] = useState(true);


    console.log("shopping list: ", cart)
   
    useEffect( () => {
        if(reloadData) {
            let array = [];
            array = cart;
            for (let i = 0; i<array.length; i++) {
                for (let j = array.length - 1; j>=0; j--) {
                  if (i === j) {
                    break;
                  }
                  if(array[i].title === array[j].title){
                      array[i].amount = array[i].amount + array[j].amount;
                      array.splice(j, 1);
                  }
                }
              }
            setArray(array);
            setReloadData(false);
            // for (let i = 0; i<array.length; i++) {
            //     if (array[i].amount === 0) {
            //         deleteBook(array[i]);
            //     }
            // }
        }
    }, [reloadData, cart, array])
   
    // useEffect( () => {
    //         if (reloadData) {
    //             fetch("http://localhost:9000/shopping/info")
    //             .then((res) => res.json())
    //             .then((text) => {
    //                 console.log("ShoppingCart: ", text)
    //                 setCart(text.result)
    //                 })
    //                 .then(setReloadData(false))
    //             .catch((err) => console.log(err))
    //             }
    //     }, [reloadData])

    function handleOpen() {
        setWantsToDelete(true);
    }

    function handleClose() {
        setWantsToDelete(false);
    }
    
    function deleteBook(id) {
        setWantsToDelete(false);
        const removeIndex = array.indexOf(id);
        array.splice(removeIndex, 1);
        setCart(array);
        setReloadData(true);
    }

    function editAmount(id, addition) {
        const editIndex = array.indexOf(id);
        // console.log(editIndex);
        array[editIndex].amount = array[editIndex].amount + addition;
        setCart(array);
        setReloadData(true);
    }

    return (
        <>
            <p>you are at the shopping cart</p>

            {array && array.map( (book) => 
            <div key={book.title}>
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
                                    <Button size="small" onClick={() => {editAmount(book, 1)}}>Add a Copy</Button>
                                    {book.amount>1?<Button size="small" onClick={() => {editAmount(book, -1)}}>Remove a copy</Button>:<></>}
                                    <Button size="small" onClick={() => {
                                        handleOpen()
                                        setDeleteId(book)
                                        }}> Delete </Button>
                                </CardActions>
                            </Box>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
            )}

            <PriceCard data={array}/>

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
                    Click Delete to remove this book from your cart. Otherwise, click Cancel.
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