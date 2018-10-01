console.log('server is up and running');

// server requirements
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const pool = require('./modules/pool.js');

// globals
const PORT = process.env.PORT || 5000;

// enables front to talk to server using express
app.use(express.static('server/public'));
// for postman testing
app.use(bodyParser.urlencoded({ extended: true }));
// enables server side requests (CRUD)
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Hello world!");
    });

// GET messages
app.get('/messages', (req, res) => {
    console.log('getting messages');
    pool.query(`SELECT * FROM "messages";`)
    .then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error with server-side GET:', error);
        res.send(500);
    })
});

// POST a message
app.post('/messages', (req, res) => {
    pool.query(`INSERT INTO "messages" ("name", "message")
    VALUES ($1,$2);`)
}) // this is as far as I was able to go



// spin up server
app.listen(PORT, () => {
    console.log('up and running on PORT 5000');
});
