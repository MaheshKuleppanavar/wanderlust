const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review=require('./review.js');

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:String,
    image: {
        url:String,
        filename:String
    },
    price:Number,
    location:String,
    country:String,
    category: {
        type: String,
        enum: [
            'trending',
            'rooms',
            'mountains',
            'iconic-cities',
            'child-care',
            'family',
            'farm',
            'arctic',
            'boats',
            'hiking',
            'adventure',
            'pub'
        ],
        required: true
    },

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

listingSchema.post('findOneAndDelete',async (listing)=>{
    if(listing){    
        let result=await Review.deleteMany({_id:{$in:listing.reviews}});
        console.log(result);
    }
})

const Listing=mongoose.model('Listing',listingSchema);

module.exports=Listing;

