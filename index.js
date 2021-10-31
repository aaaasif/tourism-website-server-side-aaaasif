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

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('TOURISO');
        const servicesCollection = database.collection('services');
        const servicesDetails = database.collection('details');

        // GET API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/details', async (req, res) => {
            const cursor = servicesDetails.find({});
            const details = await cursor.toArray();
            res.send(details);
        });

        // GET Single Service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service id', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific details', id);
            const query = { _id: ObjectId(id) };
            const details = await servicesDetails.findOne(query);
            res.json(details);
        })


        // POST API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result)
        });
        app.post('/details', async (req, res) => {
            const detail = req.body;
            console.log('hit the post api', detail);

            const result = await servicesDetails.insertOne(detail);
            console.log(result);
            res.json(result)
        });

        // DELETE API
        app.delete('/details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesDetails.deleteOne(query);
            res.json(result);
        })
        // load cart data according to user id get api
        app.get("/details/:id", async (req, res) => {
            const id = req.params.id;
            const query = { uid: id };
            const result = await servicesDetails.find(query).toArray();
            res.json(result);
        });

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running TOURISO Server');
});

app.get('/hello', (req, res) => {
    res.send('hello updated here')
})

app.listen(port, () => {
    console.log('Running TOURISO Server on port', port);
})
