function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(next); //catch error and pass it to middleware
    }
}

module.exports=wrapAsync;