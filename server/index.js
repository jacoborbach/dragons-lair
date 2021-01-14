require('dotenv').config();

const express = require('express');
const expressSession = require('express-session');
const massive = require('massive');

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

const PORT = 4000;
const app = express();

app.use(express.json())

massive({
    connectionString = CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected');
})





app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
