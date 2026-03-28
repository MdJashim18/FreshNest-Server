
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongo-simple-crud.tzwys72.mongodb.net/?appName=Mongo-simple-crud`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();

        const db = client.db("FreshNest");
        const meatsCollections = db.collection("meats");
        const fishesCollections = db.collection("fishes")
        const usersCollection = db.collection("users")
        const honeyCollections = db.collection("honey")
        const picklesCollection = db.collection("pickles");
        const VegetablesCollection = db.collection("Vegetables");
        const SpicesCollection = db.collection("Spices");
        const AnimalBasedFoodsCollection = db.collection("AnimalBasedFood");
        const categoriesCollection = db.collection("categories");
        const userAddCardCollection = db.collection("cards");
        const userOrderCollections = db.collection("order");


        app.post("/users", async (req, res) => {
            const user = req.body;
            user.role = "user";
            user.createdAt = new Date();

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
        app.get("/users", async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });
        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });
        app.patch("/users/:id", async (req, res) => {
            const { id } = req.params;
            const { role } = req.body;

            const result = await usersCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { role } }
            );
            res.send(result);
        });



        app.get('/', (req, res) => {
            res.send('Local FreshNest Network is running!');
        });





        //Meat Data function
        app.post('/meats', async (req, res) => {
            const newFood = req.body;
            const result = await meatsCollections.insertOne(newFood);
            res.send(result)
        });

        app.get('/meats', async (req, res) => {
            const cursor = meatsCollections.find()
            const result = await cursor.toArray()
            res.send(result)
        });
        app.get('/meats/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await meatsCollections.findOne(query);
            res.send(result);
        });
        app.patch('/meats/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const body = { ...req.body };
                delete body._id;

                const filter = { _id: new ObjectId(id) };
                const updateDoc = { $set: body };

                const result = await meatsCollections.updateOne(filter, updateDoc);
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error', details: err.message });
            }
        });


        app.delete("/meats/:id", async (req, res) => {
            const id = req.params.id;

            const result = await meatsCollections.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });





        //Fish data Function
        app.post('/fishes', async (req, res) => {
            const newFood = req.body;
            const result = await fishesCollections.insertOne(newFood);
            res.send(result)
        });

        app.get('/fishes', async (req, res) => {
            const cursor = fishesCollections.find()
            const result = await cursor.toArray()
            res.send(result)
        });
        app.get('/fishes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await fishesCollections.findOne(query);
            res.send(result);
        });

        app.patch('/fishes/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const body = { ...req.body };
                delete body._id;

                const filter = { _id: new ObjectId(id) };
                const updateDoc = { $set: body };

                const result = await fishesCollections.updateOne(filter, updateDoc);
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error', details: err.message });
            }
        });


        app.delete("/fishes/:id", async (req, res) => {
            const id = req.params.id;

            const result = await fishesCollections.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });





        //Honey Data function
        app.post('/honey', async (req, res) => {
            const newFood = req.body;
            const result = await honeyCollections.insertOne(newFood);
            res.send(result)
        });

        app.get('/honey', async (req, res) => {
            const cursor = honeyCollections.find()
            const result = await cursor.toArray()
            res.send(result)
        });

        app.get('/honey/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await honeyCollections.findOne(query);
            res.send(result);
        });
        app.patch('/honey/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const body = { ...req.body };
                delete body._id;

                const filter = { _id: new ObjectId(id) };
                const updateDoc = { $set: body };

                const result = await honeyCollections.updateOne(filter, updateDoc);
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error', details: err.message });
            }
        });


        app.delete("/honey/:id", async (req, res) => {
            const id = req.params.id;

            const result = await honeyCollections.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });



        //Pickles data function
        app.post('/pickles', async (req, res) => {
            const newFood = req.body;
            const result = await picklesCollection.insertOne(newFood);
            res.send(result)
        });

        app.get('/pickles', async (req, res) => {
            const cursor = picklesCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        });

        app.get('/pickles/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await picklesCollection.findOne(query);
            res.send(result);
        });
        app.patch('/pickles/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const body = { ...req.body };
                delete body._id;

                const filter = { _id: new ObjectId(id) };
                const updateDoc = { $set: body };

                const result = await picklesCollection.updateOne(filter, updateDoc);
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error', details: err.message });
            }
        });


        app.delete("/pickles/:id", async (req, res) => {
            const id = req.params.id;

            const result = await picklesCollection.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });


        //Vegetables data
        app.post('/Vegetables', async (req, res) => {
            const newFood = req.body;
            const result = await VegetablesCollection.insertOne(newFood);
            res.send(result)
        });

        app.get('/Vegetables', async (req, res) => {
            const cursor = VegetablesCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        });

        app.get('/Vegetables/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await VegetablesCollection.findOne(query);
            res.send(result);
        });
        app.patch('/Vegetables/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const body = { ...req.body };
                delete body._id;

                const filter = { _id: new ObjectId(id) };
                const updateDoc = { $set: body };

                const result = await VegetablesCollection.updateOne(filter, updateDoc);
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error', details: err.message });
            }
        });


        app.delete("/Vegetables/:id", async (req, res) => {
            const id = req.params.id;

            const result = await VegetablesCollection.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });



        //Vegetables data
        app.post('/Spices', async (req, res) => {
            const newFood = req.body;
            const result = await SpicesCollection.insertOne(newFood);
            res.send(result)
        });

        app.get('/Spices', async (req, res) => {
            const cursor = SpicesCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        });

        app.get('/Spices/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await SpicesCollection.findOne(query);
            res.send(result);
        });
        app.patch('/Spices/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const body = { ...req.body };
                delete body._id;

                const filter = { _id: new ObjectId(id) };
                const updateDoc = { $set: body };

                const result = await SpicesCollection.updateOne(filter, updateDoc);
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error', details: err.message });
            }
        });


        app.delete("/Spices/:id", async (req, res) => {
            const id = req.params.id;

            const result = await SpicesCollection.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });



        //Vegetables data
        app.post('/AnimalBasedFood', async (req, res) => {
            const newFood = req.body;
            const result = await AnimalBasedFoodsCollection.insertOne(newFood);
            res.send(result)
        });

        app.get('/AnimalBasedFood', async (req, res) => {
            const cursor = AnimalBasedFoodsCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        });

        app.get('/AnimalBasedFood/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await AnimalBasedFoodsCollection.findOne(query);
            res.send(result);
        });
        app.patch('/AnimalBasedFood/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const body = { ...req.body };
                delete body._id;

                const filter = { _id: new ObjectId(id) };
                const updateDoc = { $set: body };

                const result = await AnimalBasedFoodsCollection.updateOne(filter, updateDoc);
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error', details: err.message });
            }
        });


        app.delete("/AnimalBasedFood/:id", async (req, res) => {
            const id = req.params.id;

            const result = await AnimalBasedFoodsCollection.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });




        //Category data function
        app.post('/categories', async (req, res) => {
            const newFood = req.body;
            const result = await categoriesCollection.insertOne(newFood);
            res.send(result)
        });

        app.get('/categories', async (req, res) => {
            const cursor = categoriesCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        });
        app.delete("/categories/:id", async (req, res) => {
            const id = req.params.id;

            const result = await categoriesCollection.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        });



        app.post("/cards", async (req, res) => {
            const newCard = req.body;
            const result = await userAddCardCollection.insertOne(newCard);
            res.send(result);
        });


        app.get("/cards", async (req, res) => {
            const email = req.query.email;
            if (!email) {
                return res.status(400).send({ message: "Email required" });
            }
            const query = { email: email };
            const result = await userAddCardCollection.find(query).toArray();
            res.send(result);
        });

        app.get('/cards/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userAddCardCollection.findOne(query);
            res.send(result);
        });
        app.patch('/cards/confirm', async (req, res) => {
            const email = req.query.email;
            const filter = { email: email, status: 'pending' };
            const updateDoc = {
                $set: { status: 'Confirmed' }
            };
            const result = await userAddCardCollection.updateMany(filter, updateDoc);
            res.send(result);
        });



        app.delete('/cards/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userAddCardCollection.deleteOne(query);
            res.send(result);
        });








        //Orders
        app.post("/order", async (req, res) => {
            const newCard = req.body;
            const result = await userOrderCollections.insertOne(newCard);
            res.send(result);
        });
        app.get("/order", async (req, res) => {
            const email = req.query.email;
            let query = {};

            if (email) {
                query.userEmail = email;
            }

            const cursor = userOrderCollections.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userOrderCollections.findOne(query);
            res.send(result);
        });
        app.patch('/order/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const updateData = req.body; // Frontend theke {status: '...'} pathano hobe
                const query = { _id: new ObjectId(id) };

                // Security check: _id jate update na hoy
                if (updateData._id) {
                    delete updateData._id;
                }

                const update = {
                    $set: updateData
                };

                const result = await userOrderCollections.updateOne(query, update);
                res.send(result);
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userOrderCollections.deleteOne(query);
            res.send(result);
        });






        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

run().catch(console.dir);
