const User=require('../models/user.js');

module.exports.renderSignupForm=(req,res)=>{
    res.render('user/signup.ejs');
}

module.exports.signup=async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({
            username:username,
            email:email
        });
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(e)=>{
            if(e){
                return next(e);
            } 
            req.flash('success','Welcome to Wanderlust:)');
            res.redirect('/listings'); 
        })
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render('user/login.ejs')
}

module.exports.login=(req,res)=>{
    req.flash('success','Welcomeback to Wanderlust!');
    let redirectUrl=res.locals.redirectUrl||'/listings';
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((e)=>{
        if(e){
        return next(e);
        }
        req.flash('success','You logged out!');
        res.redirect('/listings');
    });
}