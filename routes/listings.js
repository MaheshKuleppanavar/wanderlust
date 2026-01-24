const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const {isLoggedIn, isOwner,
  validateListing,saveUrl,saveFormUrl}=require('../middleware.js');
const listingControllers=require('../controllers/listings.js');
const {storage}=require('../configCloudinary.js');
const multer  = require('multer');
const upload = multer({
    storage ,
    limits:{
        fileSize:2*1024*1024
    },
     fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    }
    cb(null, true);
  }
});

const uploadListingImage = (req, res, next) => {
  upload.single("listing[image]")(req, res, function (err) {

    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        req.flash("error", "Image must be less than 2 MB");    
        return res.redirect(req.session.redirectURL);
      }

      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        req.flash("error", "Only image files are allowed");
        return res.redirect(req.session.redirectURL);
      }
      return next(err);
    }
    next();
  });
};


router
.route('/').get(wrapAsync(listingControllers.index))
.post(isLoggedIn,saveUrl,uploadListingImage,validateListing,wrapAsync(
    listingControllers.createListing)
);

router.get('/new',isLoggedIn,saveFormUrl,
  listingControllers.renderNewForm
);

router.route('/:id')
.get(wrapAsync(listingControllers.showListing))
.put(isLoggedIn,isOwner,uploadListingImage,
    validateListing,wrapAsync(
    listingControllers.updateListing)
)
.delete(isLoggedIn,isOwner,wrapAsync(
    listingControllers.destroyListing)
);

router.get('/:id/edit',isLoggedIn,saveFormUrl,
    wrapAsync(listingControllers.renderEditForm)
);

module.exports=router;