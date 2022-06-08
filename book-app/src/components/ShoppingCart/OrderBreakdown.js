import { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../../contexts/shoppingContext";
import { Divider } from "@mui/material";

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
            <h4>Shipping: ${shippingCosts}</h4>
            <h4>Total before Tax: {total}</h4>
            <h4>Taxes: {(total * 0.053).toFixed(2)}</h4>
            <h3>Order Total: {total + (total * 0.053).toFixed(2)}</h3>
        </>
    );
}