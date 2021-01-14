//requirements
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const { CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require('./controllers/authController');
const PORT = 4000;
const app = express();
//---------------------------------------------------------------------

app.use(express.json())

//connect database
massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected');
})

//set up session?
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 180 }
}));

//Endpoints
app.post('/auth/register', authCtrl.register)

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
