const mongoose = require('mongoose');
var validator = require("email-validator");

var productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    stock: {
        type: String,
    },
    picture: {
        type: Object,
    }
})

mongoose.model('products', productSchema);