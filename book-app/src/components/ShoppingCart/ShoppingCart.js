import { useEffect, useState, useContext } from "react";
import {Card, CardActionArea, CardContent, CardMedia, CardActions, Typography, Box, Button, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ShoppingContext } from "../../contexts/shoppingContext";
import PriceCard from "./PriceCard";
import './shoppingCart.css';
// import TextField from '@mui/material/TextField';
// import BookCard from "./BookCard";

export default function ShoppingCart() {
  const { cart, setCart } = useContext(ShoppingContext);
  const [array, setArray] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [wantsToDelete, setWantsToDelete] = useState(false);
  const [reloadData, setReloadData] = useState(true);

    // console.log("shopping list: ", cart)
   
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
  // console.log("shopping list: ", cart);

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
    <h1>Shopping Cart</h1>

    <div className="leftSide">
    {array &&
        array.map((book) => (
            <div className="product" key={book.id}>
              <Card
                raised={true}
                sx={{ display: "flex", width: "100%" }}
                className="bookCard"
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, float: "right" }}
                    image={
                      "https://covers.openlibrary.org/b/isbn/" +
                      book.isbn +
                      "-L.jpg"
                    }
                    alt={book.title}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "70%",
                    }}
                  >
                    <CardContent
                      className="topSongDescription"
                      sx={{ flex: "1 0 auto" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        <br></br>
                        {book.title}, $1
                      </Typography>
                      <br></br>

                      {book.amount > 1 ? (
                        <IconButton aria-label="removeCopy" onClick={() => {
                          editAmount(book, -1);
                        }}>
                          <RemoveIcon></RemoveIcon>
                      </IconButton>
                      ) : (
                        <></>
                      )}

                      <Typography
                        variant="body"
                        fontSize={16}
                        color="text.secondary"
                        sx={{ fontWeight: "bold"}}
                      >
                      {book.amount}
                      </Typography>

                      <IconButton aria-label="addCopy" onClick={() => {
                          editAmount(book, 1);
                        }}>
                          <AddIcon></AddIcon>
                      </IconButton>
                
                    </CardContent>

                    <CardActions>
                    <div className="deleteButtonDiv">
                      <Button size="small" variant="contained" color="error" className="deleteButton"
                        onClick={() => {
                          handleOpen();
                          setDeleteId(book);
                        }}
                      >
                        {" "}
                        Delete{" "}
                      </Button>
                    </div>
                    </CardActions>
                  </Box>
                </CardActionArea>
              </Card>
            </div>
        ))}
    </div>
      
      <div className="priceCard">
        <PriceCard data={array}/>
      </div>

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
            Click Delete to remove this book from your cart. Otherwise, click
            Cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              deleteBook(deleteId);
            }}
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
