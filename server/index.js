//requirements
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const { CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController')
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

//Authentication Endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

//Dragon Endpoints
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
