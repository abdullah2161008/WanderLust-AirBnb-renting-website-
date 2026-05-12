const express = require("express");
const router = express.Router();


//index-users
router.get("/",(req,res)=>{
    res.send("GET for users");
});

//show-users
router.get("/:id",(req,res)=>{
    res.send("Get for show users");
});

//POSt-users
router.post("/",(req,res)=>{
    res.send("Post for show users");
});

//DELETE
router.delete("/:id",(req,res)=>{
    res.send("delete for show users");
});

module.exports = router;