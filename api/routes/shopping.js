const express = require("express")
const firestore = require("../node_modules/firebase/firestore");
const db = require("../firebase.js");
const router = express.Router()
const collectionName = "Cart"
const {setDoc, doc, deleteDoc}= require("firebase/firestore");


router.get("/info", (req, res, next) => {
    const array = [];

    console.log(req.query)

    firestore.getDocs(firestore.collection(db, collectionName))
    .then((allDocs) => {
        allDocs.forEach((doc) => {
            array.push(doc.data())
        })
        console.log("array: ", array)
    })
    .then( () => {
        res.set('Content-Type', 'application/json')
        res.json({result: array})
    })

    })

router.delete("/delete/:id", async (req, res) => {
    console.log("delete", req.params);
    await deleteDoc(doc(db, collectionName, req.params.id))
    res.send("Got request")
})

module.exports = router