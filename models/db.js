const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/EmployeeDB";
//const url = "mongodb+srv://khangnv:xZXVmNQZ6q3wsyr@cluster0.e9ofe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log("Connected with MongoDB Database"); }
    else {
        console.log("An Error Occured, Please try again!");
    }
})

require('./users.model');
require('./products.model');
