const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(flash());




const sessionOptions = {
    secret:"mysupersecretstring",//used to sign the session ID cookie
    resave: false,              // don’t save session if not modified
    saveUninitialized: true,    // save new sessions even if empty
}

app.use(session(sessionOptions));

app.get("/test",(req,res)=>{
    res.send("test successful");
});

app.get("/reqCount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send(`You sent a request ${req.session.count} times`)
});

app.get("/register",(req,res)=>{
    let {name = "Anonymous"} = req.query;
    req.session.name = name;
    if(name === "Anonymous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered Successfully");
    }
    res.redirect("/hello");
});

app.use((req,res,next)=>{
    res.locals.successMsg  = req.flash("success");
    res.locals.errMsg = req.flash("error");
    next();
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name
    });
});



// app.get("/register",(req,res)=>{
//     let {name = "Anonymous"} = req.query;
//     req.session.name = name;
//     if(name==="Anonymous"){
//         req.flash("error","user not registered");    
//     }else{
//         req.flash("success","user registered successfully");
//     }
//     res.redirect("/hello")
// });

// app.get("/register",(req,res)=>{
//     let {name}
// })

// app.use((req,res,next)=>{
//     res.locals.successMsg = req.flash("success");
//     res.locals.errMsg = req.flash("error")
//     next();
// });

// app.get("/hello",(req,res)=>{
//     res.render("page.ejs",{name:req.session.name});
// });


// const sessionOptions = {
//     secret: "mysupersecretstring",      // used to sign the session ID cookie
// //   cookie: { secure: false }   // set to true if using HTTPS
// }


// app.use(session(sessionOptions));

// app.get("/register",(req,res)=>{
//     let {name= "Anonymous"} = req.query;
//     res.send({name});
// })

// app.get("/hello",(req,res)=>{
//     res.send("hello")
// })

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// })

app.get("/test",(req,res)=>{
    res.send("test successful");
})

app.listen(3000,()=>{
    console.log("App is working");
})

// app.use(cookieParser("secretcode"));

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","Salam");
//     res.cookie("Origin","Pakistan");
//     res.send("Sent you some cookies");
// })

// app.get("/greet",(req,res)=>{
//     let {name="Anonymous"} = req.cookies;
//     res.send(`Hi ,${name}`);
// });

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("color","green",{signed:true});
//     res.send("done!")
// });

// app.get("/verify",(req,res)=>{
//     res.send(req.signedCookies);
// });

// app.use("/users",users);
// app.use("/posts",posts);
