const express = require("express");
// const listing = require("../models/listing");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js")

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//New and create route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});

//index.route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));


//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate("reviews");
    // .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does't exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}));

//create new route
router.post("/",validateListing,isLoggedIn,wrapAsync(async (req, res,next) => {
    const newListing = new Listing(req.body.listing);  // creates a new listing
    await newListing.save();                   // saves to DB
    req.flash("success","New listing Created");
    res.redirect("/listings");  
}));


//Edit and update route
router.get("/:id/edit",isLoggedIn,wrapAsync( async(req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id)
    if(!listing){
        req.flash("error","Listing you requested for does't exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

//update
router.put("/:id",
    isLoggedIn,
    validateListing,
    wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing}); 
    req.flash("success","Updated Successfuly!")
    res.redirect("/listings")
}));


//delete route
router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    const {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}));

module.exports = router;
