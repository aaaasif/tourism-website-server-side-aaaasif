const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kz6u6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)

app.get('/', (req, res) => {
    res.send('Running tourism Server');
});

app.get('/hello', (req, res) => {
    res.send('hello updated here')
})

app.listen(port, () => {
    console.log('Running tourism Server on port', port);
})