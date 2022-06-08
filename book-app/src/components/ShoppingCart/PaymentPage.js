import { useContext, useEffect, useState } from "react";
import {Grid, TextField, Button, Select, InputLabel, MenuItem} from "@mui/material";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { ShoppingContext } from "../../contexts/shoppingContext";
import {useNavigate} from 'react-router-dom';
import './paymentPage.css'
import { Paper } from "@material-ui/core";
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
    const [amount, setAmount] = useState(0);
    
    const defaultValues ={
        first: "",
        last: "",
        email: "",
        creditCardNum: "",
        expirationMonth: 1,
        expirationYear: "2022",
        expirationDate: "",
        cvc: ""
    }
    const [formValues, setFormValues] = useState(defaultValues);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [firstError, setFirstError] = useState(false);
    const [lastError, setLastError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [creditCardNumberError, setCreditCardNumberError] = useState(false);
    const [expirationYearErorr, setExpirationYearError] = useState(false);
    const [cvcError, setCVCError] = useState(false);

    const handleInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleFirstInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!onlyLettersAndSpaces(value)) {
            setFirstError(true);
        }
        else{
            setFirstError(false);
        }
    }

    const handleLastInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!onlyLettersAndSpaces(value)) {
            setLastError(true);
        }
        else{
            setLastError(false);
        }
    }

    const handleEmailInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!validateEmail(value)) {
            setEmailError(true);
        }
        else{
            setEmailError(false);
        }
    }

    const handleCreditCardNumberInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!validCreditCardNumber(value)) {
            setCreditCardNumberError(true);
        }
        else{
            setCreditCardNumberError(false);
        }
    }

    const handleExpirationYearInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!onlyNumbers(value)) {
            setExpirationYearError(true);
        }
        else{
            setExpirationYearError(false);
        }
    }

    const handleCVCInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!validCVV(value)) {
            setCVCError(true);
        }
        else{
            setCVCError(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        // setFormValues(defaultValues);
        setDataSubmitted(true);
    };

    useEffect( () => {
        setData(cart)

        let sum = 0;
        for (let i = 0; i<data.length; i++) {
            sum += data[i].amount;
        }
        setAmount(sum);
    }, [cart, data])

    function goBack() {
        navigate('/shopping-cart')
    }

    function onlyLettersAndSpaces(str) {
        return /^[A-Za-z\s]*$/.test(str);
      }

    function onlyNumbers(str) {
        return /^[0-9][0-9][0-9][0-9]$/.test(str);
      }

    function validCreditCardNumber(str) {
        return /^[0-9]{15,16}$/.test(str)
    }

    function validCVV(str) {
        return /^[0-9]{3,4}$/.test(str)
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    return(
        <>
           {amount>1?<h1>Checkout - {amount} items</h1>:amount===1?<h1>Checkout - {amount} item</h1>:<h1>You have no Items</h1>}
            <div className="parent">
            <div className="div2"><p>This is the zipcode</p></div>
            <div className='div1'>
                <Paper elevation={5}>
                    {dataSubmitted?<form onSubmit={handleSubmit}>
                            <Grid container spacing={2} alignItems="center" direction="column">
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        variant="filled" color="success"
                                        id="first-name-input"
                                        name="first"
                                        label="First Name"
                                        type="text"
                                        value={formValues.first}
                                        onChange={handleFirstInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        variant="filled" color="success"
                                        id="last-name-input"
                                        name="last"
                                        label="Last Name"
                                        type="text"
                                        value={formValues.last}
                                        onChange={handleLastInputChange}
                                    />
                                </Grid>
                                 <Grid item>
                                    <TextField
                                        required
                                        variant="filled" color="success"
                                        id="email-input"
                                        name="email"
                                        label="Email Address"
                                        type="text"
                                        value={formValues.email}
                                        onChange={handleEmailInputChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <InputLabel id="demo-simple-select-label">Expiration Date</InputLabel>
                                    <Select
                                        required
                                        variant="filled" color="success"
                                        id="expiration-month-input"
                                        name="expirationMonth"
                                        value={formValues.expirationMonth}
                                        label="Month"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={1}>1 - January</MenuItem>
                                        <MenuItem value={2}>2 - February</MenuItem>
                                        <MenuItem value={3}>3 - March</MenuItem>
                                        <MenuItem value={4}>4 - April</MenuItem>
                                        <MenuItem value={5}>5 - May</MenuItem>
                                        <MenuItem value={6}>6 - June</MenuItem>
                                        <MenuItem value={7}>7 - July</MenuItem>
                                        <MenuItem value={8}>8 - August</MenuItem>
                                        <MenuItem value={9}>9 - September</MenuItem>
                                        <MenuItem value={10}>10 - October</MenuItem>
                                        <MenuItem value={11}>11 - November</MenuItem>
                                        <MenuItem value={12}>12 - December</MenuItem>
                                    </Select>

                                    <TextField
                                        required
                                        variant="filled" color="success"
                                        id="expiration-year-input"
                                        name="expirationYear"
                                        label="Expiration Year"
                                        type="text"
                                        value={formValues.expirationYear}
                                        onChange={handleExpirationYearInputChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        required
                                        variant="filled" color="success"
                                        id="creditCardNumber-input"
                                        name="creditCardNum"
                                        label="Credit Card Number"
                                        type="text"
                                        value={formValues.creditCardNum}
                                        onChange={handleCreditCardNumberInputChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        required
                                        variant="filled" color="success"
                                        id="cvc-input"
                                        name="cvc"
                                        label="CVV"
                                        type="number"
                                        value={formValues.cvc}
                                        onChange={handleCVCInputChange}
                                    />
                                </Grid>
                                <div className='submitButton'>
                                    <Button variant="contained" disabled color="primary" type="submit" className='addStudentbutton'>
                                        Submit
                                    </Button>
                                </div>
                            </Grid>
                            </form>:
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} alignItems="center" direction="column">
                                <Grid item xs={12} sm={4}>
                                    {firstError?<TextField
                                        required
                                        variant="outlined"
                                        id="first-name-input"
                                        name="first"
                                        label="First Name"
                                        type="text"
                                        error
                                        value={formValues.first}
                                        onChange={handleFirstInputChange}
                                    />:<TextField
                                        required
                                        variant="outlined"
                                        id="first-name-input"
                                        name="first"
                                        label="First Name"
                                        type="text"
                                        value={formValues.first}
                                        onChange={handleFirstInputChange}
                                    />}
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    {lastError?<TextField
                                        required
                                        variant="outlined"
                                        id="last-name-input"
                                        name="last"
                                        label="Last Name"
                                        type="text"
                                        error
                                        value={formValues.last}
                                        onChange={handleLastInputChange}
                                    />:<TextField
                                        required
                                        variant="outlined"
                                        id="last-name-input"
                                        name="last"
                                        label="Last Name"
                                        type="text"
                                        value={formValues.last}
                                        onChange={handleLastInputChange}
                                    />  }
                                </Grid>
                                 <Grid item>
                                    {emailError?<TextField
                                        required
                                        variant="outlined"
                                        id="email-input"
                                        name="email"
                                        label="Email Address"
                                        type="text"
                                        error
                                        value={formValues.email}
                                        onChange={handleEmailInputChange}
                                    />:<TextField
                                        required
                                        variant="outlined"
                                        id="email-input"
                                        name="email"
                                        label="Email Address"
                                        type="text"
                                        value={formValues.email}
                                        onChange={handleEmailInputChange}
                                    /> }
                                </Grid>
                                <Grid item>
                                    <InputLabel id="demo-simple-select-label">Expiration Date</InputLabel>
                                    <Select
                                        required
                                        variant="outlined"
                                        id="expiration-month-input"
                                        name="expirationMonth"
                                        value={formValues.expirationMonth}
                                        label="Month"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={1}>1 - January</MenuItem>
                                        <MenuItem value={2}>2 - February</MenuItem>
                                        <MenuItem value={3}>3 - March</MenuItem>
                                        <MenuItem value={4}>4 - April</MenuItem>
                                        <MenuItem value={5}>5 - May</MenuItem>
                                        <MenuItem value={6}>6 - June</MenuItem>
                                        <MenuItem value={7}>7 - July</MenuItem>
                                        <MenuItem value={8}>8 - August</MenuItem>
                                        <MenuItem value={9}>9 - September</MenuItem>
                                        <MenuItem value={10}>10 - October</MenuItem>
                                        <MenuItem value={11}>11 - November</MenuItem>
                                        <MenuItem value={12}>12 - December</MenuItem>
                                    </Select>

                                    {expirationYearErorr?<TextField
                                        required
                                        variant="outlined"
                                        id="expiration-year-input"
                                        name="expirationYear"
                                        label="Expiration Year"
                                        type="text"
                                        error
                                        value={formValues.expirationYear}
                                        onChange={handleExpirationYearInputChange}
                                    />:<TextField
                                        required
                                        variant="outlined"
                                        id="expiration-year-input"
                                        name="expirationYear"
                                        label="Expiration Year"
                                        type="text"
                                        value={formValues.expirationYear}
                                        onChange={handleExpirationYearInputChange}
                                    />}
                                </Grid>
                                <Grid item>
                                    {creditCardNumberError?<TextField
                                        required
                                        variant="outlined"
                                        id="creditCardNumber-input"
                                        name="creditCardNum"
                                        label="Credit Card Number"
                                        type="text"
                                        error
                                        value={formValues.creditCardNum}
                                        onChange={handleCreditCardNumberInputChange}
                                    />:<TextField
                                        required
                                        variant="outlined"
                                        id="creditCardNumber-input"
                                        name="creditCardNum"
                                        label="Credit Card Number"
                                        type="text"
                                        value={formValues.creditCardNum}
                                        onChange={handleCreditCardNumberInputChange}
                                    /> }
                                </Grid>
                                <Grid item>
                                    {cvcError?<TextField
                                        required
                                        variant="outlined"
                                        id="cvc-input"
                                        name="cvc"
                                        label="CVV"
                                        type="number"
                                        error
                                        value={formValues.cvc}
                                        onChange={handleCVCInputChange}
                                    />:<TextField
                                        required
                                        variant="outlined"
                                        id="cvc-input"
                                        name="cvc"
                                        label="CVV"
                                        type="number"
                                        value={formValues.cvc}
                                        onChange={handleCVCInputChange}
                                    /> }
                                </Grid>
                                <div className='submitButton'>
                                    <Button variant="contained" color="primary" type="submit" className='addStudentbutton'>
                                        Submit
                                    </Button>
                                </div>
                            </Grid>
                            </form>
                        }
                </Paper>
            </div>
            <div className="div5"><Button onClick={goBack}>Go Back</Button></div>
            <div className="div4"><p>Price breakdown</p></div>
            <div className="div3"><p>Delivery options</p></div>
            {/* <Button variant="outlined" onClick={goBack} className='goBackButton'> Go Back </Button> */}
            </div>
        </>
    );
}