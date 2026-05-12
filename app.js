const express = require("express");
const app = express();
const port = 8080;
const Listing = require("./models/listing.js");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
// const {isLoggedIn} = require("./middleware.js")

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const sessionOptions = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    },
};


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main()
    .then((res)=>{
        console.log("connection successful");
    })
    .catch(err => console.log(err));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.json());
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


//Creating utility MiddleWare
app.use((err,res,req,next)=>{
    req.responseTime = new Date(Date.now()).toString();
    console.log(req.method,req.path,req.responseTime,req.hostname)
});


app.get("/",(req,res)=>{
    res.send("working");
});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"delta-student"
//     });
//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);






//if you write wrong url then it will apear
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

//middleware
app.use((err,req,res,next)=>{
    let {status=500,message="Something went wrong"} = err;
    res.status(status).render("error.ejs",{err});
    // res.send("Something went wrong");
});



app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});
