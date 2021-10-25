const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ovsdb")
    .then(() => {
        console.log("connection Successful.");
    })
    .catch((e) => {
        console.log(e);
    });