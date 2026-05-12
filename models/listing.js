const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: { type: String, required: true },
    // title:Joi.string().required()
    description: String,
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=700&auto=format&fit=crop&q=60",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=700&auto=format&fit=crop&q=60" : v
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

module.exports = mongoose.model("Listing", listingSchema);

