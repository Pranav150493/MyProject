const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

//Index Route
router.get("/", async (req,res) =>{
    const allListings =  await Listing.find({});
     res.render("listings/index.ejs", {allListings});  
   });
   
   //New Route
   router.get("/new",isLoggedIn, (req, res) =>{
       res.render("listings/new.ejs");
   });
   
   //Create Route
   router.post("/",validateListing,isLoggedIn,wrapAsync (async(req, res, next) => {
         const newListing = new Listing(req.body.listing);  // Create a new Listing instance
         await newListing.save();  // Save the listing to the database
         req.flash("success", "New Listing Created!");
         res.redirect("/listings");  // Redirect to the listings page
       })
   );
   
   //Show Route
   router.get("/:id",isLoggedIn,  wrapAsync (async (req,res) =>{
       let {id} = req.params;
       const listing =  await Listing.findById({_id:id}).populate("reviews");
       if(!listing){
        req.flash("success", "Listing you requested for does not exist!");
        res.redirect("/listings");
       };
       res.render("listings/show.ejs", {listing});
       
   }));
   
   //Edit Route
   router.get("/:id/edit",isLoggedIn, wrapAsync (async (req,res) =>{
       let {id} = req.params;
       id = id.trim(); 
       const listing =  await Listing.findById(id);
       if(!listing){
        req.flash("success", "Listing you requested for does not exist!");
        res.redirect("/listings");
       };
       res.render("listings/edit.ejs", {listing});
   } ));
   
   //Update Route
   router.put("/:id",validateListing,isLoggedIn, wrapAsync (async (req,res) =>{
       let {id} = req.params;
      await Listing.findByIdAndUpdate(id, {...req.body.listing});
      req.flash("success", "Listing Updated");
      res.redirect("/listings");
   }));
   
   //Delete Route
   router.delete("/:id",isLoggedIn,wrapAsync (async (req, res) =>{
       let {id} = req.params;
       const deletedListing = await Listing.findByIdAndDelete(id);
       console.log(deletedListing);
       req.flash("success", "Listing Deleted!");
       res.redirect("/listings");
   }));
   
   module.exports = router;