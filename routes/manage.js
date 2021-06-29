const expresshdb = require('express-handlebars');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const multer = require('multer');
const Product = mongoose.model('products');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
})
var upload = multer({ storage: storage });

router.get('/add', (req, res) => {
    res.render('addOrEditproduct', {
        loginCSS: "/stylesheets/loginform.css",
        viewTitle: "Add Product"
    });
})

router.get('/', (req, res) => {
    if (req.query.qr) {
        let nameq = req.query.qr;
        Product.find({ name: nameq }, (err, docs) => {
            if (!err) {
                res.render('manage', {
                    bootstrapCSS: "/stylesheets/bootstrap.css",
                    mainCSS: "/stylesheets/main.css",
                    bootstrap3: "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css",
                    awesome: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
                    list: docs
                })
            }
        })
    } else {
        Product.find((err, docs) => {
            if (!err) {
                res.render('manage', {
                    bootstrapCSS: "/stylesheets/bootstrap.css",
                    mainCSS: "/stylesheets/main.css",
                    list: docs
                })
            }
        })
    }
})

router.get('/update/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("addOrEditproduct", {
                viewTitle: "Update Employee",
                product: doc
            })
        }
    })
})
router.get("/delete/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/manage');
        } else {
            console.log(`An error occured during the delete process` + err);
            res.redirect('/manage');
        }
    })
});

router.post("/", upload.single('image'), (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});


function insertRecord(req, res) {
    var product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.picture = req.file;

    product.save((err, data) => {
        if (!err) {
            res.redirect("/Ad_product");
        } else {
            res.render('addOrEditproduct', {
                viewTitle: 'Add Product',
                product: req.body,
                notification: `Error occurred during data insertion ${err}`,
            });
        }
    });
}
function updateRecord(req, res) {
    Product.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/manage');
        } else {
            res.render('addOrEditproduct', {
                viewTitle: 'Update Product',
                product: req.body,
                notification: `Error occurred during data insertion ${err}`,
            });
        }
    });
}

module.exports = router;