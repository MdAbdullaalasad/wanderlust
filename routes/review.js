const express = require("express");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const WrapAsync = require("../utlits/WrapAsync.js");
const CustomError = require("../utlits/CustomError.js");
const {reviewSchema}=require("../joiSchema.js")
const router = express.Router({mergeParams: true});

const validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        let newErr = error.details.map((el) => el.message).join(",");
        throw new CustomError(400, newErr);
    }else{
        next();
    }
};

//post Review Route 
router.post('/', validateReview, WrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
 
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
   
    res.redirect(`/listings/${listing.id}`)
   
 }));
 
 //Delete Reviews Route
 router.delete("/:reviewId", WrapAsync(async(req,res) => {
     let {id , reviewId} = req.params; 
     await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
     await Review.findByIdAndDelete(reviewId);
     res.redirect(`/listings/${id}`) 
 }));

 module.exports = router;