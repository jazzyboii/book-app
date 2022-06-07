const express = require("express")
const router = express.Router() 

router.get("/info", async (req, res, next) => {
    const allISBN = []
    

    res.json({ISBN: allISBN})
})

module.exports = router