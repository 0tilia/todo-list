const express = require("express");
const date = require(__dirname + "/date.js");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();

const items = [];
const workItems = [];

app.use(express.static("public")); // how to incorporate css into the server bcs it's not a static file!!;

app.set('view engine', 'ejs');

app.use(urlencoded({extended: true}));

app.get("/", function(req, res){
    
    const day = date.getDate();

    
   res.render("list", {listTitle: day, newListItems: items}) 
});

app.post("/", function(req, res) {

    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});

});

// app.post("/work", function(req, res){
//     // let item = req.body.newItem;
//     // workItems.push(item);
//     res.redirect("/work");
// })


app.listen(3000, function(){
    console.log("Server on port 3000.");

})