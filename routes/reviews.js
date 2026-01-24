const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js');
const Review=require('../models/review.js');
const {validateReview,isLoggedIn, isOwner, isReviewOwner}=require('../middleware.js');
const reviewController=require('../controllers/reviews.js');

router.post('/',validateReview,wrapAsync(reviewController.createReview));

router.delete('/:reviewId',isLoggedIn,isReviewOwner,wrapAsync(reviewController.destroyReview));

module.exports=router;