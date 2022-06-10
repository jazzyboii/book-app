var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var dotenv = require('dotenv').config()

const accessToken = process.env.client_id_nyt 

router.get('/', async (req, res, next) => {
    try{
        console.log(req.query.token)
        const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=' + accessToken
        //const url = 'https://api.spotify.com/v1/me/top/tracks?offset=0&limit=25&time_range=long_term'
        const data = await fetch(url)
            .catch(err=> console.log(err))
            .then(res=> res.json())
            .then(data => data)

        res.status(200).send(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


module.exports = router;