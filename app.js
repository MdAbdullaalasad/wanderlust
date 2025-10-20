const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { url } = require("inspector");


const listing = require("../wanderlust/routes/listing.js");
const review = require("../wanderlust/routes/review.js");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB")
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(mongo_url);
};


app.get('/', (req, res) => {
    res.send("root is working.")
});

app.use("/listings", listing);
app.use("/listings/:id/reviews", review);


app.all(/(.*)/, (req, res,next) => { 
    next( new CustomError(404,"Page not found"));
});


app.use((err, req, res, next) => {
    let { status = 500, message = "something is wrong" } = err;
    res.status(status).render("listings/error.ejs", { message }); 
});

app.listen(8080, () => {
    console.log("server is listenign port 8080.")
});