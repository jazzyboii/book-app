import React from 'react'
//import { AccessTokenContext } from '../Contexts/accessTokenContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
import { Typography } from '@mui/material';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import cx from 'clsx';
import Color from 'color';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@mui/material';
import BestSell from './BestSell';




function fixTitle(title) {
    let text = title;
    let result = text.toLowerCase();
    return result.replace(/\b\w/g , function(m){ return m.toUpperCase(); } );;
}


function BestSellersPage() {
    //const accessToken = process.env.client_id_nyt 
    //const { accessToken } = useContext(AccessTokenContext);
    const [bestsellers, setBestSellers] = useState([]);



    useEffect(() => {
        const fetchBest = async () => {
            const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_BOOKS_API_KEY}`)
        
        console.log(res.data);
        console.log(res.data.results.books);
        setBestSellers(res.data.results.books);
        }
        fetchBest()
    }, [])
/*
    useEffect(() => {
     fetch("/bestsellers").then(res => res.json()).then(data => setBestSellers(data.items))
    }, [])
   /*
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        fetch("/topartists/"+newAlignment+"?token="+ accessToken).then(res => res.json()).then(data => setBestSellers(data.items))
    };
*/
    console.log(bestsellers)
    return (
        <div>
            <Grid container>
            {bestsellers.length > 0 && 
                bestsellers.map((val, key) => 
                    <Grid item xs={12} sm={2.4}>
                        <Box
                            style={{
                                flex: "1",
                                padding: "20",
                                margin: ".25rem",
                                border: "15px solid white",
                            }}          
                        >
                        <BestSell
                            name={fixTitle(val.title)}
                            author={val.author}
                            rank={key + 1}
                            isbn={val.primary_isbn13}
                            image={val.book_image}
                            description={val.description}
                            weeksonlist={val.weeks_on_list}
                            publisher={val.publisher}
                        />
                        </Box>
                    </Grid>
                
                )
            }
            </Grid>
        </div>
    )
}

/*
                        <CardActionArea className={styles.actionArea} onClick={handleOpen}>
                            <Card className={styles.root}>
                                <CardMedia
                                component="img"
                                height="300"
                                alt="No Photo Found"
                                image={(val.book_image) || 'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg'}
                                />
                                <CardContent>
                                    <Typography className={styles.typography2} gutterBottom variant="h5" component="div">
                                    {fixTitle(val.title)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    By {val.author}
                                    </Typography>
                                    <Typography variant="body3" color="text.secondary">
                                    Rank: {val.rank}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={styles.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <div className={styles.paper}>
                                        <h2>Animated React Modal</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim.
                                        </p>
                                    </div>
                                </Fade>
                            </Modal>
                        </CardActionArea>
*/

export default BestSellersPage;