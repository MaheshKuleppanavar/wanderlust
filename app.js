if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const ejs=require('ejs');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const session=require('express-session');
const {MongoStore}=require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');
const listingRouter=require('./routes/listings.js');
const reviewRouter=require('./routes/reviews.js');
const userRouter=require('./routes/user.js');

// const mongoUrl = 'mongodb://127.0.0.1:27017/wanderlust';
  const dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_LOCAL;

async function main() {
      await mongoose.connect(dbUrl)
}

main()
.then(() => {
    console.log('Connected Successfully 🔗');
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:{PORT} 🚀`);
    });
})
.catch(err => {
    console.log('Mongo connection error:', err);
});


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
}
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user;
    next();
})

app.use('/',userRouter);
app.use('/listings',listingRouter);
app.use('/listings/:id/reviews',reviewRouter);

app.use((req, res) => {
  res.status(404).send(`<h4>404 Not Found!</h4>`);
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message='Something went wrong'}=err;
    console.log(err);
    res.status(statusCode).render('error.ejs',{message});
});

