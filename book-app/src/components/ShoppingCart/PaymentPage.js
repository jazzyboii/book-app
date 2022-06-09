import { useContext, useEffect, useState } from "react";
import {Grid, TextField, Button, InputLabel, Paper, FormControl, FormLabel, RadioGroup, Radio, FormGroup, FormControlLabel, Divider, Select, MenuItem } from "@mui/material";
import { ShoppingContext } from "../../contexts/shoppingContext";
import {useNavigate} from 'react-router-dom';
import './paymentPage.css'
import OrderBreakdown from "./OrderBreakdown";

export default function PaymentPage() {
    const navigate = useNavigate();
    const {cart} = useContext(ShoppingContext);
    const [data, setData] = useState([])
    const [amount, setAmount] = useState(0);
    // const [longitude, setLongitude] = useState();
    // const [latitude, setLatitude] = useState();
    const [officialLocation, setOfficialLocation] = useState({
        longitude: "",
        latitude: "",
        streetAddress: "",
        zipcode: "",
        city: ""
    });
    const [deliveryOption, setDeliveryOption] = useState("regular");

    const defaultValues ={
        address:"",
        zipcode:"",
        city:""
    }

    const creditCardDefaultValues ={
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
    const [creditCardFormValues, setCreditCardFormValues] = useState(creditCardDefaultValues);
    // const [dataSubmitted, setDataSubmitted] = useState(false);
    const [creditDataSubmitted, setCreditDataSubmitted] = useState(false);
    const [locationDataSubmitted, setLocationDataSubmitted] = useState(false);
    const [zipCodeError, setZipCodeError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [firstError, setFirstError] = useState(false);
    const [lastError, setLastError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [creditCardNumberError, setCreditCardNumberError] = useState(false);
    const [expirationYearErorr, setExpirationYearError] = useState(false);
    const [cvcError, setCVCError] = useState(false);

    useEffect( () => {
        setData(cart)

        let sum = 0;
        for (let i = 0; i<data.length; i++) {
            sum += data[i].amount;
        }
        setAmount(sum);
    }, [cart, data])

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
          } 
          else {
            return(
                <p>Geolocation is not supported by this browser.</p>);
          }
        }

    function setPosition(position) {
            setOfficialLocation({...officialLocation, longitude: position.coords.longitude, latitude: position.coords.latitude})
            // setLongitude(position.coords.longitude);
            // setLatitude(position.coords.latitude);
            setLocationDataSubmitted(true);
    }

    const handleLocationSubmit = (event) => {
        event.preventDefault();
        // console.log(formValues);
        setOfficialLocation({...officialLocation, streetAddress: formValues.address, zipcode: formValues.zipcode, city: formValues.city})
        setLocationDataSubmitted(true);
    };

    const handleCreditSubmit = (event) => {
        event.preventDefault();
        // console.log(creditCardFormValues);
        setCreditDataSubmitted(true);
    };

    const handleLocationInputChange = (e) => {
        setLocationDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCreditInputChange = (e) => {
        setCreditDataSubmitted(false);
        const{name, value} = e.target;
        setCreditCardFormValues({
            ...creditCardFormValues,
            [name]: value,
        });
    };

    const handleZipCodeInputChange = (e) => {
        setLocationDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!onlyNumbers(value)) {
            setZipCodeError(true);
        }
        else{
            setZipCodeError(false);
        }
    }

    const handleCityInputChange = (e) => {
        setLocationDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if(!onlyLettersAndSpaces(value)) {
            setCityError(true);
        }
        else{
            setCityError(false);
        }
    }

    const handleFirstInputChange = (e) => {
        setCreditDataSubmitted(false);
        const{name, value} = e.target;
        setCreditCardFormValues({
            ...creditCardFormValues,
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
        setCreditDataSubmitted(false);
        const{name, value} = e.target;
        setCreditCardFormValues({
            ...creditCardFormValues,
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
        setCreditDataSubmitted(false);
        const{name, value} = e.target;
        setCreditCardFormValues({
            ...creditCardFormValues,
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
        setCreditDataSubmitted(false);
        const{name, value} = e.target;
        setCreditCardFormValues({
            ...creditCardFormValues,
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
        setCreditDataSubmitted(false);
        const{name, value} = e.target;
        setCreditCardFormValues({
            ...creditCardFormValues,
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
        setCreditDataSubmitted(false);
        const{name, value} = e.target;
        setCreditCardFormValues({
            ...creditCardFormValues,
            [name]: value,
        });
        if(!validCVV(value)) {
            setCVCError(true);
        }
        else{
            setCVCError(false);
        }
    }

    function onlyLettersAndSpaces(str) {
        return /^[A-Za-z\s]*$/.test(str);
      }

    function onlyNumbers(str) {
        return /^[0-9]{4,5}$/.test(str);
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

    function goBack() {
        navigate('/shopping-cart')
    }

    const handleDeliveryChange = (event) => {
        setDeliveryOption(event.target.value);
      };
    return(
        <>
            <div>
                {amount>1?<h1>Checkout - {amount} items</h1>:amount===1?<h1>Checkout - {amount} item</h1>:<h1>You have no Items</h1>}
            </div>
            
            <div className="parent">
            
                <div className="div2">
                    <Paper elevation={5} className="locationBacking">
                    {locationDataSubmitted?
                        <div>
                            <h2>Thank you, Location Recieved!</h2>
                            <Button onClick={()=> {setLocationDataSubmitted(false)}}>Edit Information</Button>
                            {/* <p>{latitude}</p>
                            <p>{longitude}</p> */}
                        </div>
                        :<div className="locationGetter">
                            <h2>Location Information</h2>
                            <Button variant = "contained" color = "success" className="locationButton" onClick={getLocation}>Get Location</Button>
                        <form onSubmit={handleLocationSubmit} className="form">
                            <Grid container spacing={2} alignItems="center" direction="column">
                                <Grid item>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="address-input"
                                        name="address"
                                        label="Mailing Address"
                                        type="text"
                                        value={formValues.address}
                                        onChange={handleLocationInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    {zipCodeError?<TextField
                                            required
                                            variant="outlined"
                                            id="zipcode-input"
                                            name="zipcode"
                                            label="Zip Code"
                                            type="text"
                                            error
                                            value={formValues.zipcode}
                                            onChange={handleZipCodeInputChange}
                                        />:<TextField
                                            required
                                            variant="outlined"
                                            id="zipcode-input"
                                            name="zipcode"
                                            label="Zip Code"
                                            type="text"
                                            value={formValues.zipcode}
                                            onChange={handleZipCodeInputChange}
                                        />}
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                    {cityError?<TextField
                                            required
                                            variant="outlined"
                                            id="city-input"
                                            name="city"
                                            label="City"
                                            type="text"
                                            error
                                            value={formValues.city}
                                            onChange={handleCityInputChange}
                                        />:<TextField
                                        required
                                            variant="outlined"
                                            id="city-input"
                                            name="city"
                                            label="City"
                                            type="text"
                                            value={formValues.city}
                                            onChange={handleCityInputChange}
                                        />}
                                    </Grid>
                                    <div className='submitButton'>
                                        <Button variant="contained" color="primary" type="submit" className='submitButton'>
                                            Submit
                                        </Button>
                                    </div>
                            </Grid>
                        </form>
                    </div>}
                <Divider/>
                
                <FormControl>
                    <FormLabel id="delivery-options-group-label">Delivery Options</FormLabel>

                    <RadioGroup
                        aria-labelledby="delivery-options-group-label"
                        value={deliveryOption}
                        name="radio-buttons-group"
                        onChange={handleDeliveryChange}
                    >
                        <FormControlLabel value="regular" control={<Radio />} label="Regular Shipping (5 day)" />
                        <FormControlLabel value="expedited" control={<Radio />} label="Expedited Shipping (1 day)" />
                    </RadioGroup>
                </FormControl>

                </Paper>
                </div>

                <div className='div1'>
                <Paper elevation={5} className="creditCardbacking">
                    <h2>Payment Information</h2>
                    {creditDataSubmitted?<form onSubmit={handleCreditSubmit}>
                        
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
                                        value={creditCardFormValues.first}
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
                                        value={creditCardFormValues.last}
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
                                        value={creditCardFormValues.email}
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
                                        value={creditCardFormValues.expirationMonth}
                                        label="Month"
                                        onChange={handleCreditInputChange}
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
                                        value={creditCardFormValues.expirationYear}
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
                                        value={creditCardFormValues.creditCardNum}
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
                                        value={creditCardFormValues.cvc}
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
                        <form onSubmit={handleCreditSubmit}>
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
                                        value={creditCardFormValues.first}
                                        onChange={handleFirstInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
                                        id="first-name-input"
                                        name="first"
                                        label="First Name"
                                        type="text"
                                        value={creditCardFormValues.first}
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
                                        value={creditCardFormValues.last}
                                        onChange={handleLastInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
                                        id="last-name-input"
                                        name="last"
                                        label="Last Name"
                                        type="text"
                                        value={creditCardFormValues.last}
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
                                        value={creditCardFormValues.email}
                                        onChange={handleEmailInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
                                        id="email-input"
                                        name="email"
                                        label="Email Address"
                                        type="text"
                                        value={creditCardFormValues.email}
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
                                        value={creditCardFormValues.expirationMonth}
                                        label="Month"
                                        onChange={handleCreditInputChange}
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
                                        value={creditCardFormValues.expirationYear}
                                        onChange={handleExpirationYearInputChange}
                                    />:<TextField
                                        required
                                        variant="outlined"
                                        id="expiration-year-input"
                                        name="expirationYear"
                                        label="Expiration Year"
                                        type="text"
                                        value={creditCardFormValues.expirationYear}
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
                                        value={creditCardFormValues.creditCardNum}
                                        onChange={handleCreditCardNumberInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
                                        id="creditCardNumber-input"
                                        name="creditCardNum"
                                        label="Credit Card Number"
                                        type="text"
                                        value={creditCardFormValues.creditCardNum}
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
                                        value={creditCardFormValues.cvc}
                                        onChange={handleCVCInputChange}
                                    />:<TextField
                                        required
                                        variant="standard"
                                        id="cvc-input"
                                        name="cvc"
                                        label="CVV"
                                        type="number"
                                        value={creditCardFormValues.cvc}
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

                <div className="div3"></div>

                <div className="div4">
                <Button variant="contained" onClick={goBack}>Shopping Cart</Button>
                    <Paper elevation={5} className="orderBacking">
                        <OrderBreakdown amount={amount} deliveryOption={deliveryOption} location={officialLocation} locationSubmit={locationDataSubmitted} creditSubmit={creditDataSubmitted}/>
                    </Paper>
                </div>

            {/* <Button variant="outlined" onClick={goBack} className='goBackButton'> Go Back </Button> */}
            </div>
        </>
    );
}