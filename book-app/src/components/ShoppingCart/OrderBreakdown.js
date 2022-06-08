import { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../../contexts/shoppingContext";
import { Divider, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { typography } from "@mui/system";

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
            <h4>Shipping: ${shippingCosts}</h4>
            <h4>Total before Tax: ${preTotal}.00</h4>
            <h4>Taxes: {taxes}</h4>
            <h3>Order Total: ${postTotal}</h3>
            {orderPlaced?<Button variant="contained" disabled onClick={placeOrder}>Place Your Order</Button>:<Button variant="contained" onClick={placeOrder}>Place Your Order</Button>}

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