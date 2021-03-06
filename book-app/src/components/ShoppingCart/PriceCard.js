import { Card, CardContent, CardActions, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './priceCard.css';
// import { useState, forwardRef } from "react";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Slide from '@mui/material/Slide';

// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

export default function PriceCard(props) {
    const navigate = useNavigate();
    let amount = 0;
    if (props.data !== null) {
        for (let i = 0; i<props.data.length; i++) {
            amount += props.data[i].amount;
        }
    }
    
    function goToPaymentPage() {
        navigate('/payment-page');
    }

    // function handleOpen() {
    //     setWantsToPay(true);
    // }

    // function handleClose() {
    //     setWantsToPay(false);
    // }

    return( 
        <>
            <Card sx={{width:"100%", float:"right"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        Subtotal - {amount} items
                    </Typography>
                </CardContent>
                {props.data!==null?props.data.map( (book) => <div key={book.title}>
                    {book.amount>1?<p>{book.title} -  $1.00 x ({book.amount}) = ${book.amount}.00</p>:book.amount===1?<p>{book.title} - $1.00</p>:<></>}
                </div>):<></>}
                <br></br>
                <Divider>Total</Divider>
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        ${amount}.00
                    </Typography>
                </CardContent>

                <CardActions >
                    <div className="paymentDiv">
                        <Button className="paymentButton" variant="contained" color="success" size="large" onClick={goToPaymentPage}>Continue to Payment</Button>
                    </div>
                </CardActions>
            </Card>

            {/* <Dialog
                open={wantsToPay}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle>{"Checkout"}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Order Summary
                    </DialogContentText>
                    <DialogContentText>
                        Items: ${amount}.00
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog> */}
        </>
    )
}