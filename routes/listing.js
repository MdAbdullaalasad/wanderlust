const express = require("express");
const Listing = require("../models/listing.js");
const WrapAsync = require("../utlits/WrapAsync.js");
const CustomError = require("../utlits/CustomError.js");
const {listingSchema}=require("../joiSchema.js")
const router = express.Router();

const validatelisting=(req,res,next)=>{
    const {error} =listingSchema.validate(req.body);
    if(error){
        let newErr=error.details.map((el)=>el.message).join(",");
        throw new CustomError(400  , newErr);
    }else{
        next();
    };
};

//listing route
router.get('/', WrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//add from 
router.get('/add', (req, res) => {
    res.render("listings/add.ejs")
});

//show route
router.get('/:id', WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate('reviews');
    res.render("listings/show.ejs", { list })

}));

//create route
router.post('/',validatelisting, WrapAsync(async (req, res, next) => {
    //let {title,description,image,price,location,country}=req.body;
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

//edit form
router.get('/:id/edit', WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    res.render("listings/edit.ejs", { list });
}));

//update route
router.put('/:id',validatelisting, WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete('/:id', WrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteId = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deleteId);
}));


module.exports = router;