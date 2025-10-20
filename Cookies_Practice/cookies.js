const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretCode"))

app.get("/", (req,res)=>{
    res.send("Hello I am Root Route.")
});

 

app.get("/vrify",(req,res) =>{
    console.log(req.signedCookies)
    res.send("show")
})

app.listen("3000", (req,res) =>{
    console.log("Cookies Server is running Port = 3000")
});