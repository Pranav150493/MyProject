const express = require("express");
const router = express.Router();

//Index - Users
router.get("/", (req,res) =>{
    res.send("GET for users")
});
//Show - Users
router.get("/:id", (req,res) =>{
    res.send("GET for show user id")
});
//Post Users
router.post("/", (req, res) =>{
    res.send("POST for users")
});
//Delete - Users
router.get("/:id", (req,res) =>{
    res.send("DELETE for show user id")
});

module.exports = router;