const { number } = require("joi");
const mongoose=require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;
const defaultImageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
        min:5,
        max:100,
    },
    description:{
        type:String,
    },
    image: {
        filename: String,
        url: {
          type: String,
          default:defaultImageUrl,
          set: (v) =>
            v.trim() === ""
              ? defaultImageUrl
              : v,
        },
      },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId, ref: "Review"
        }
    ]
});

listingSchema.post('findOneAndDelete',async(listing)=>{
    if(listing?.reviews?.length){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
     
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;