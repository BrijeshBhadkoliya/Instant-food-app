const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session'); 
const tosty = require('./middleware/tostyfy');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
require('./config/db').connectDB();

app.set('view engine', 'ejs');

app.use(session({
    secret: "brijesh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000*60*24 ,secure: false}
}));

app.use(tosty);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./Routes/indexrouts'));



app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
    console.log(`http://localhost:${PORT}`);
});            