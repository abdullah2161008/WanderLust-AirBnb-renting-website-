const express = require("express");
const router = express.Router();




//index-users-posts
router.get("/",(req,res)=>{
    res.send("GET for posts");
});

//show-users
router.get("/:id",(req,res)=>{
    res.send("Get for show post");
});

//POSt-users
router.post("/",(req,res)=>{
    res.send("Post for show post");
});

//DELETE
router.delete("/:id",(req,res)=>{
    res.send("delete for  posts");
});

module.exports = router;