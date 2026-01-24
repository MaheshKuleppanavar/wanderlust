const Listing=require('../models/listing');

module.exports.index=async (req,res)=>{
    let listings;
    let {city,filter}=req.query;
    if(city){
        city=city.charAt(0).toUpperCase() + city.slice(1);
        listings=await Listing.find({location:city});
    }
    else if(filter){
        listings=await Listing.find({category:filter})
    }
    else{
        listings=await Listing.find({});
    }
    res.render('listings/index.ejs',{listings});
}

module.exports.renderNewForm=(req,res)=>{
    res.render('listings/new.ejs');
}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:'reviews',populate:'author'}).populate('owner');
    if(!listing){
        req.flash('error','Listing you request does not exist!');
        res.redirect('/listings');
    }else{
        res.render('listings/show.ejs',{listing});
    }   
}

module.exports.createListing=async(req,res,next)=>{
    let filename=req.file.filename;
    let url=await req.file.path;
    let listing=req.body.listing;
    const newListing=new Listing(listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash('success','New Listing Created'); 
    res.redirect('/listings');
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    let originalImgUrl=listing.image.url.replace('/upload','/upload/w_250');
    res.render('listings/edit.ejs',{listing,originalImgUrl});
}

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !=='undefined'){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    if(!listing){
        req.flash('error','Listing you requested does not exist');
        res.redirect('/listings');
    }
    else{
        req.flash('success','Listing Updated');
        res.redirect(`/listings/${id}`);
    }
}
 
module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    const deletedListing=await Listing.findByIdAndDelete(id);
    if(!deletedListing){
        req.flash('error','Listing you requested does not exist');
        res.redirect('/listings');
    }
    else{
        req.flash('success','Listing Deleted');
        res.redirect('/listings');
    }
}