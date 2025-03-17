const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session'); 
const tosty = require('./middleware/tostyfy');
require('dotenv').config();
const cloudinary  = require('cloudinary').v2;
const PORT = process.env.PORT || 3000;
require('./config/db').connectDB();

app.set('view engine', 'ejs');

const cookieparser = require('cookie-parser');
app.use(cookieparser())

// passprot js oauth 
const passport = require('passport')
const passportgoogel = require('./config/googleauth')





app.use(session({
    secret: "brijesh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000*60*24 ,secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



app.use(tosty);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'logos')));


app.use('/', require('./Routes/indexrouts'));



app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
    console.log(`http://localhost:${PORT}`);
});            