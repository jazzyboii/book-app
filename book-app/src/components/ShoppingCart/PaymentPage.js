import { useContext, useEffect, useState } from "react";
import {Grid, TextField, Button, InputLabel, Paper, FormControl, FormLabel, RadioGroup, Radio, FormGroup, FormControlLabel, Divider } from "@mui/material";
import { ShoppingContext } from "../../contexts/shoppingContext";
import {useNavigate} from 'react-router-dom';
import './paymentPage.css'
import { makeStyles, } from '@material-ui/core/styles';
import CreditCardForm from "./CreditCardForm";

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
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [deliveryOption, setDeliveryOption] = useState("regular");

    const defaultValues ={
        address:"",
        zipcode:"",
        city:""
    }
    const [formValues, setFormValues] = useState(defaultValues);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [zipCodeError, setZipCodeError] = useState(false);
    const [cityError, setCityError] = useState(false);

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
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
            setDataSubmitted(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        // setFormValues(defaultValues);
        setDataSubmitted(true);
    };

    const handleInputChange = (e) => {
        setDataSubmitted(false);
        const{name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleZipCodeInputChange = (e) => {
        setDataSubmitted(false);
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
        setDataSubmitted(false);
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

    function onlyLettersAndSpaces(str) {
        return /^[A-Za-z\s]*$/.test(str);
      }

    function onlyNumbers(str) {
        return /^[0-9]{4,5}$/.test(str);
    }

    function goBack() {
        navigate('/shopping-cart')
    }

    const handleDeliveryChange = (event) => {
        setDeliveryOption(event.target.value);
      };
    return(
        <>
           {amount>1?<h1>Checkout - {amount} items</h1>:amount===1?<h1>Checkout - {amount} item</h1>:<h1>You have no Items</h1>}
            
            <div className="parent">
            
                <div className="div2">
                <Paper elevation={5}>
            {dataSubmitted?
                <div>
                    <Button onClick={()=> {setDataSubmitted(false)}}>Edit Information</Button>
                    <h4>Thank you, Location Recieved!</h4>
                    {/* <p>{latitude}</p>
                    <p>{longitude}</p> */}
                </div>
                :<div>
                    <Button variant = "contained" color = "success" onClick={getLocation}>Get Location</Button>
                    <form onSubmit={handleSubmit}>
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
                                    onChange={handleInputChange}
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
                                    <Button variant="contained" color="primary" type="submit" className='addStudentbutton'>
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
                    aria-labelledby="delivery-optoins-group-label"
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
                    <CreditCardForm/>
                </div>

                <div className="div5"><Button onClick={goBack}>Go Back</Button></div>

                <div className="div4"><p>Price breakdown</p></div>

                <div className="div3"><p>Delivery options</p></div>
            {/* <Button variant="outlined" onClick={goBack} className='goBackButton'> Go Back </Button> */}
            </div>
        </>
    );
}