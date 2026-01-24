const Listing=require('./models/listing.js');
const {listingSchema,reviewSchema}=require('./schema.js');
const ExpressError=require('./utils/ExpressError.js');
const Review=require('./models/review.js');

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){ 
        req.session.redirectUrl=req.originalUrl;
        req.flash('error','Please log in to continue');
        return res.redirect('/login');
    }
    next();
}

module.exports.saveUrl=(req,res,next)=>{
    if(req.session.redirectUrl){  
        res.locals.redirectUrl=req.session.redirectUrl||'/listings';
    }
    next();
}

module.exports.saveFormUrl=(req,res,next)=>{
    req.session.redirectURL=req.originalUrl;
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let currentUser=res.locals.currentUser;
    let listing=await Listing.findById(id);
    if(!(currentUser&&currentUser._id.equals(listing.owner._id))){
        req.flash('error','You are not owner of the listing');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewOwner=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    let currentUser=res.locals.currentUser;
    if(!(currentUser&&currentUser._id.equals(review.author._id))){
        req.flash('error','You are not a author of this review');
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body); 
    if(error){
        let errMsg=error.details.map(ele=>ele.message).join(',');
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body); 
    if(error){
        let errMsg=error.details.map(ele=>ele.message).join(',');
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}