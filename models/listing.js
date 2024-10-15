const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename:
        {
            type: String,
            required: true,
            default: "listing_image.jpg"
        },
        url:
        {
            type: String,
            required: true,
            default: "https://media.istockphoto.com/id/517377998/photo/beautiful-sunset-at-tropical-beach.jpg?s=1024x1024&w=is&k=20&c=oTypKDTZ7VFQ8rs-es3xaTIwTFisH8BqhD5xf_tbbgI="
        }, // Make sure you're defining this correctly.
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.DeleteMany({_id: {$in:listing.reviews}});
    }   
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;