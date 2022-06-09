import React, { useContext, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//import { AccessTokenContext } from '../Contexts/accessTokenContext';

import { useState } from 'react';


import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';
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
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import TextInfoContent from '@mui-treasury/components/content/textInfo';


const useStyles = makeStyles(({ breakpoints, spacing}) => ({
    actionArea: {
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      },
    root: {
      maxWidth: 304,
      margin: 'auto',
      borderRadius: 16,
      '&:hover': {
        boxShadow: `0 6px 12px 0 ${Color('#282c34')
          .rotate(-12)
          .darken(0.2)
          .fade(0.5)}`,
      }
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: 'initial',
    },
    typography: {
        textTransform: 'lowercase'
    },
    typography2: {
        textTransform: 'capitalize'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        //backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        //boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 4, 3),
    },
    rootmodal: {
        margin: 'auto',
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        maxWidth: 600,
        marginLeft: 'auto',
        overflow: 'initial',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: spacing(2),
        [breakpoints.up('md')]: {
          flexDirection: 'row',
          paddingTop: spacing(2),
        },
    },
    mediamodal: {
        width: '88%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: spacing(-3),
        height: 110,
        paddingBottom: '48%',
        borderRadius: spacing(2),
        backgroundColor: '#fff',
        position: 'relative',
        [breakpoints.up('md')]: {
          width: '100%',
          marginLeft: spacing(-3),
          marginTop: 0,
          transform: 'translateX(-8px)',
        },
    },
  }));

function BestSell(props) {
  const { name, author, rank, isbn, image, description, weeksonlist, publisher } = props;

  const showAlert=(e) => {
    var text = e.currentTarget.value + " was added to cart!"
    alert(text)
  }

  const styles = useStyles();
  const shadowStyles = useOverShadowStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const [ open, setOpen ] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  return (
    <div>
                        <CardActionArea className={styles.actionArea} onClick={handleOpen}>
                            <Card className={styles.root}>
                                <CardMedia
                                component="img"
                                height="300"
                                alt="No Photo Found"
                                image={(image) || 'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg'}
                                />
                                <CardContent>
                                    <Typography className={styles.typography2} gutterBottom variant="h5" component="div">
                                    {name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    By {author}
                                    </Typography>
                                    <Typography variant="body3" color="text.secondary">
                                    Rank: {rank}
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
                                    <div>
                                    <Card className={cx(styles.rootmodal, shadowStyles.rootmodal)}>
                                        <CardMedia
                                            className={styles.mediamodal}
                                            image={image}
                                        />
                                        <CardContent>
                                        {/*<Box display="flex" alignItems="center">
                                           <IconButton onClick={handleClose}>
                                             <CloseIcon />
                                           </IconButton>
                                        </Box>
                                        */}
                                          <TextInfoContent
                                            classes={contentStyles}
                                            overline={'#' + rank +' Bestseller!'}
                                            heading={name}
                                            />
                                            <TextInfoContent
                                            classes={contentStyles}
                                            overline={'By ' + author}
                                            />
                                            <br></br>
                                            <TextInfoContent
                                            classes={contentStyles}
                                            body={description}
                                            />
                                            <br></br>
                                            <TextInfoContent
                                            classes={contentStyles}
                                            body={'Publisher: ' + publisher}
                                            />
                                            <TextInfoContent
                                            classes={contentStyles}
                                            body={'ISBN: ' + isbn}
                                            />
                                            <br></br>
                                            <Button className={buttonStyles} onClick={showAlert}>Add to cart</Button>
                                            <br></br>
                                            <br></br>
                                            <TextInfoContent
                                            classes={contentStyles}
                                            overline={'Press Esc to Close'}
                                            />
                                        </CardContent>
                                    </Card>
                                    </div>
                                </Fade>
                            </Modal>
                        </CardActionArea>
    </div>
  );
}

/*
          <Button
            variant="contained"
            value={name}
            sx={{ m: 2 }}
            onClick={showAlert}
          >
            Add to cart
          </Button>
*/

export default BestSell;