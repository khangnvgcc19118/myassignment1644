require('./models/db');
const expresshdb = require('express-handlebars');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const manage = require('./routes/manage');
const app = express();
const crypto = require('crypto');

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static("public"));
app.use(bodyParser.json());
app.set('views',path.join(__dirname,'/views/'))

app.engine('hbs', expresshdb({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
/// Cookies
app.get('/cookie', function (req, res) {
    res.cookie('username', 'freetuts.net', { expires: new Date(Date.now() + 900000) });
});
app.get('/getCookie', function (req, res) {
    if (req.cookies['username'])
        res.send(`Cookie value ${req.cookies['username']}`);
    else res.send('Cannot find');
});

app.get('/signout', (req, res) => {
    if (req.cookies.username)
        res.clearCookie('username'); // Remove cookie
    res.redirect('/');
});
///

app.set('view engine','hbs');
app.get('/', (req, res) => {
    if (req.cookies['username']) redirect('/manage');
    else redirect('/users');
});


app.use('/users', users);
app.use('/manage', manage);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on Port 3000");
});
