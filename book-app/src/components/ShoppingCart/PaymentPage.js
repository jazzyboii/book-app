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
    const defualtValues ={
        first: "",
        last: "",
        profile: "data:image/jpeg;base64,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",
        role: "Student",
    }
    const [formValues, setFormValues] = useState(defualtValues);
    const [dataSubmitted, setDataSubmitted] = useState(false);


    useEffect( () => {
        setData(cart)
        // .then(console.log("array: ", data))
    }, [cart, data])

    console.log(data);
    let amount = 0;
    for (let i = 0; i<data.length; i++) {
        amount += data[i].amount;
    }

    const handleInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        setDataSubmitted(true);
    };

    function goBack() {
        navigate('/shopping-cart')
    }
    return(
        <>
           {amount>1?<h1>Checkout - {amount} items</h1>:amount===1?<h1>Checkout - {amount} item</h1>:<h1>You have no Items</h1>}
            <div className="parent">
            <div className="div2"><p>This is the zipcode</p></div>
            <div className='div1'>
                <form onSubmit={handleSubmit}>
                <h1>Payment Information</h1>
                <Grid container spacing={5} alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            required
                            id="card-number-input"
                            name="card-number"
                            label="Card Number"
                            type="number"
                            value={formValues.first}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="last-name-input"
                            name="last"
                            label="Last Name"
                            type="text"
                            value={formValues.last}
                            onChange={handleInputChange}
                        /> 
                    </Grid>
                    <div className='submitButton'>
                        <Button variant="contained" color="primary" type="submit" className='addStudentbutton'>
                            Submit
                        </Button>
                    </div>
                </Grid>
                </form>
            </div>
            <div className="div5"><Button onClick={goBack}>Go Back</Button></div>
            <div className="div4"><p>Price breakdown</p></div>
            <div className="div3"><p>Delivery options</p></div>
            {/* <Button variant="outlined" onClick={goBack} className='goBackButton'> Go Back </Button> */}
            </div>
        </>
    );
}