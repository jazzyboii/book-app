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
    const [shippingCosts, setShippingCosts] = useState(0);
    const [total, setTotal] = useState(0);
    const weightInOz = 5 * props.amount;
    let shippingMultiplier = 1;
    if(props.deliveryOption === "expidited") {
        shippingMultiplier = 2;
    }

    let costPerOz;
    if (weightInOz < 20) {
        costPerOz = 2 * shippingMultiplier;
    }
    else if (weightInOz > 32) {
        costPerOz = 20 * shippingMultiplier;
    }
    else {
        costPerOz = 10 * shippingMultiplier;
    }

    useEffect( () => {
        const cost = (costPerOz * weightInOz * 0.01).toFixed(2);
        setShippingCosts(cost);
        const total = props.amount + shippingCosts;
        setTotal(total);
    }, [costPerOz, weightInOz])

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
                {props.creditSubmit && props.locationSubmit?!orderPlaced?<Button className="orderButton" variant="contained" onClick={placeOrder}>Place Your Order</Button>:<Button className="orderButton" variant="contained" disabled onClick={placeOrder}>Place Your Order</Button>:<Button className="orderButton" variant="contained" disabled onClick={placeOrder}>Place Your Order</Button>}
                {/* {orderPlaced?<Button className="orderButton" variant="contained" disabled onClick={placeOrder}>Place Your Order</Button>:<Button className="orderButton" variant="contained" onClick={placeOrder}>Place Your Order</Button>} */}
            </div>

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