const Listing=require('../models/listing.js');
const Review=require('../models/review.js');

module.exports.createReview=async (req,res)=>{
    let listing=await Listing.findById(req.params.id);
    const newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.author=req.user._id;
    await newReview.save();
    await listing.save();
    req.flash('success','Review Created');
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async (req,res)=>{
    let {id,reviewId}=req.params;
    let r1listing=await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    let review=await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review Deleted');
    res.redirect(`/listings/${id}`);
}