import {Grid, TextField, Button, Select, InputLabel, MenuItem, Paper, Divider} from "@mui/material";
import {useState} from 'react';
import './creditCard.css'
import OrderBreakdown from "./OrderBreakdown";

export default function CreditCardForm() {
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
            <div className="creditCardFormPart">
            <Paper elevation={5} className="creditCardbacking">
            <h2>Payment Information</h2>
                    {dataSubmitted?<form onSubmit={handleSubmit}>
                        
                            <Grid container spacing={2} alignItems="center" direction="column">
                                <Grid item>
                                </Grid>
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
                                    <Divider orientation="vertical" flexItem />
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
                                        variant="standard"
                                        id="first-name-input"
                                        name="first"
                                        label="First Name"
                                        type="text"
                                        error
                                        value={formValues.first}
                                        onChange={handleFirstInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
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
                                        variant="standard"
                                        id="last-name-input"
                                        name="last"
                                        label="Last Name"
                                        type="text"
                                        error
                                        value={formValues.last}
                                        onChange={handleLastInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
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
                                        variant="standard"
                                        id="email-input"
                                        name="email"
                                        label="Email Address"
                                        type="text"
                                        error
                                        value={formValues.email}
                                        onChange={handleEmailInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
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
                                    <br></br>
                                    <Select
                                        required
                                        variant="outlined"
                                        id="expiration-month-input"
                                        name="expirationMonth"
                                        value={formValues.expirationMonth}
                                        label="Month"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={1}>January</MenuItem>
                                        <MenuItem value={2}>February</MenuItem>
                                        <MenuItem value={3}>March</MenuItem>
                                        <MenuItem value={4}>April</MenuItem>
                                        <MenuItem value={5}>May</MenuItem>
                                        <MenuItem value={6}>June</MenuItem>
                                        <MenuItem value={7}>July</MenuItem>
                                        <MenuItem value={8}>August</MenuItem>
                                        <MenuItem value={9}>September</MenuItem>
                                        <MenuItem value={10}>October</MenuItem>
                                        <MenuItem value={11}>November</MenuItem>
                                        <MenuItem value={12}>December</MenuItem>
                                    </Select>
                                    {/* <Divider orientation="vertical" flexItem /> */}
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
                                        variant="standard"
                                        id="creditCardNumber-input"
                                        name="creditCardNum"
                                        label="Credit Card Number"
                                        type="text"
                                        error
                                        value={formValues.creditCardNum}
                                        onChange={handleCreditCardNumberInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
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
                                        variant="standard"
                                        id="cvc-input"
                                        name="cvc"
                                        label="CVV"
                                        type="number"
                                        error
                                        value={formValues.cvc}
                                        onChange={handleCVCInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
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

        <div className="orderBreakdownPart">
            <OrderBreakdown></OrderBreakdown>
        </div>
        </>
    );
}