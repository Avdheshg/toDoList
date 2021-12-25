const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Using bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Using the CSS files
app.use(express.static("public"));

// Using EJS
app.set('view engine', 'ejs');

// Using the date module
const dateModule = require(__dirname + "/date.js");

// saving to the DB
// const defaultItemsArray = [item1, item2, item3];

let newItemArray = [];

const item1 = "Daily meeting with team";

const item2 = "Build News API";

const item3 = "Upload to Github";

// Adding the default items to the array
newItemArray.push(item1, item2, item3 );
 
app.get("/", (req, res) => {
    
    const date = dateModule.date();
    console.log(date);

    res.render("index", {newItemHTML: newItemArray, dateHTML: date});


});

app.post("/", (req, res) => {
    const newItem = req.body.newItem;

    // // Checking if the item already present in the array
    let isDup = false;
    newItemArray.forEach(function(item) {
        if (item === newItem) {
            console.log(newItem + " is already present");
            isDup = true;
            return;
        }
    });

    if (!isDup) {
        newItemArray.push(newItem);
        console.log(newItem + " is added successfully. And updated array is \n" + newItemArray);
        res.redirect("/");
    }
});

// Defining the post route for deleting the items
app.post("/delete", function(req, res) {
    // Grabbing the value of the checked item 
    const checkedItem = req.body.checkbox;
    console.log(checkedItem);

    console.log("item checked " + req.body.checkbox);

    const itemNumber = newItemArray.indexOf(checkedItem);
    // for (let i = 0; i < newItemArray.length; i++) {
    //     if (newItemArray[i] === checkedItem) {
    //         itemNumber = i;
    //         break;
    //     }
    // }

    console.log(itemNumber);

    newItemArray.splice(itemNumber, 1);

    console.log("After slicing the new array is \n" + newItemArray);

    res.redirect("/");

});


app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000");
});
























































