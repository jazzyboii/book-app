import { useEffect, useState } from "react";
import { Button, Divider } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './orderBreakdown.css'

export default function OrderBreakdown(props) {
    // const {cart} = useContext(ShoppingContext);
    const [shippingCosts, setShippingCosts] = useState("");
    const [preTotal, setPreTotal] = useState("");
    const [taxes, setTaxes] = useState("");
    const [postTotal, setPostTotal] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect( () => {
        const weightInOz = 5 * props.amount;
        let shippingMultiplier = 1;
        if(props.deliveryOption === "expidited") {
            shippingMultiplier = 2;
        }

        let costPerOz = 0;
        if (weightInOz < 20) {
            costPerOz = 2 * shippingMultiplier;
        }
        else if (weightInOz > 32) {
            costPerOz = 15 * shippingMultiplier;
        }
        else {
            costPerOz = 7 * shippingMultiplier;
        }

        const varShippingCosts = costPerOz * weightInOz * 0.01;
        const varPreTotal = props.amount + varShippingCosts;
        const varTaxes = varPreTotal * 0.053;
        const varPostTotal = varPreTotal + varTaxes;
        setShippingCosts(varShippingCosts.toFixed(2));
        console.log(shippingCosts, " shipping costs is a ", typeof(shippingCosts))
        setPreTotal(varPreTotal);
        console.log(preTotal, " pretotal is a ", typeof(preTotal))
        setTaxes(varTaxes.toFixed(2))
        console.log(taxes, " taxes is a ", typeof(taxes))
        setPostTotal(varPostTotal.toFixed(2))
        console.log(postTotal, " postotal is a ", typeof(postTotal))
    }, [props.amount])
//https://github.com/jasonpau/react-shipping-calculator/blob/master/src/main.js
    function placeOrder() {
        setOrderPlaced(true);
        setOpenDialog(true);
    }

    function handleClose () {
        setOpenDialog(false);
        setOrderPlaced(false);
    }

    function handleCloseSuccess() {
        setOpenDialog(false);
    }

    return( 
        <>
            <h2>Order Summary</h2>
            <Divider/>
            <h4>Books: ${props.amount}.00</h4>
            <h4>Shipping Estimate: ${shippingCosts}</h4>
            <h4>Total before Tax: ${preTotal}.00</h4>
            <h4>Taxes: {taxes}</h4>
            <h3>Order Total: ${postTotal}</h3>
            <div className="orderButtonDiv">
                {orderPlaced?<Button className="orderButton" variant="contained" disabled onClick={placeOrder}>Place Your Order</Button>:<Button className="orderButton" variant="contained" onClick={placeOrder}>Place Your Order</Button>}
            </div>

            {/* <Card sx={{width:"100%"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        Order Summary
                    </Typography>
                    <Divider/>
                </CardContent>
                    <Typography>
                    <h4>Books: ${props.amount}.00</h4>
                    <h4>Shipping Estimate: ${shippingCosts}</h4>
                    <h4>Total before Tax: ${preTotal}.00</h4>
                    <h4>Taxes: {taxes}</h4>
                    <br></br>
                    <h3>Order Total: ${postTotal}</h3>
                    </Typography>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    </Typography>
                </CardContent>

                <CardActions>
                    {orderPlaced?<Button variant="contained" disabled onClick={placeOrder}>Place Your Order</Button>:<Button variant="contained" onClick={placeOrder}>Place Your Order</Button>}
                </CardActions>
            </Card> */}

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="order-placement-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Please Confirm Your Order"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Click Confirm to go ahead with your order of ${postTotal}.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCloseSuccess} autoFocus color="success">
                    Confirmed
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}