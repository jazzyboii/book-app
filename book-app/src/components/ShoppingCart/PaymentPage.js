import { useContext, useEffect, useState } from "react";
import {Grid, TextField, Button} from "@mui/material";
import { ShoppingContext } from "../../contexts/shoppingContext";
import {useNavigate} from 'react-router-dom';
import './paymentPage.css'
import { Container, Paper, Box, } from "@material-ui/core";
import { makeStyles, } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    boxWrapper: {
        marginBottom: "55px",
        minHeight: "calc(26vh + 260px)"
    },
    container: {
        position: "relative",
        zIndex: "1100",
        marginTop: "-95px",
        marginBottom: "45px",
    }
}));


export default function PaymentPage() {
    const navigate = useNavigate();
    const {cart} = useContext(ShoppingContext);
    const [data, setData] = useState([])
    const classes = useStyles();

    useEffect( () => {
        setData(cart)
        // .then(console.log("array: ", data))
    }, [cart, data])

    console.log(data);
    let amount = 0;
    for (let i = 0; i<data.length; i++) {
        amount += data[i].amount;
    }

    function goBack() {
        navigate('/shopping-cart')
    }
    return(
        <>
           {amount>1?<h1>Checkout - {amount} items</h1>:amount===1?<h1>Checkout - {amount} item</h1>:<h1>You have no Items</h1>}
            <div className="parent">
            <div className="div2"><p>This is the zipcode</p></div>
            <div className='div1'>
                <Box component="main" className={classes.boxWrapper}>
                    <Container maxWidth="md" className={classes.container}>
                        <Paper elevation={5}>
                            
                        </Paper>
                    </Container>
                </Box>
            </div>
            <div className="div5"><Button onClick={goBack}>Go Back</Button></div>
            <div className="div4"><p>Price breakdown</p></div>
            <div className="div3"><p>Delivery options</p></div>
            {/* <Button variant="outlined" onClick={goBack} className='goBackButton'> Go Back </Button> */}
            </div>
        </>
    );
}