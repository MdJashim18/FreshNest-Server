
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
let db;

async function connectDB() {
    if (db) return db;

    await client.connect();
    db = client.db("FreshNest");
    console.log("MongoDB Connected");
    return db;
}

// Root
app.get('/', (req, res) => {
    res.send('FreshNest Server Running ');
});


app.post("/users", async (req, res) => {
    try {
        const db = await connectDB();
        const user = req.body;
        user.role = "user";
        user.createdAt = new Date();

        const result = await db.collection("users").insertOne(user);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get("/users", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("users").find().toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("users").findOne({
            _id: new ObjectId(req.params.id),
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch("/users/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;
        const { role } = req.body;

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: { role } }
        );
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// app.get('/', (req, res) => {
//     res.send('Local FreshNest Network is running!');
// });

//Meat Data function
app.post('/meats', async (req, res) => {
    try {
        const db = await connectDB();
        const newFood = req.body;
        const result = await db.collection("meats").insertOne(newFood);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/meats', async (req, res) => {
    try {
        const db = await connectDB();
        const cursor = db.collection("meats").find()
        const result = await cursor.toArray()
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/meats/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("meats").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/meats/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const body = { ...req.body };
        delete body._id;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: body };

        const result = await db.collection("meats").updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});
app.delete("/meats/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("meats").deleteOne({
            _id: new ObjectId(req.params.id),
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});





//Fish data Function
app.post('/fishes', async (req, res) => {
    try {
        const db = await connectDB();
        const newFood = req.body;
        const result = await db.collection("fishes").insertOne(newFood);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/fishes', async (req, res) => {
    try {
        const db = await connectDB();
        const cursor = db.collection("fishes").find()
        const result = await cursor.toArray()
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/fishes/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("fishes").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/fishes/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const body = { ...req.body };
        delete body._id;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: body };

        const result = await db.collection("fishes").updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});
app.delete("/fishes/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("fishes").deleteOne({
            _id: new ObjectId(req.params.id),
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});





//Honey Data function
app.post('/honey', async (req, res) => {
    try {
        const db = await connectDB();
        const newFood = req.body;
        const result = await db.collection("honey").insertOne(newFood);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/honey', async (req, res) => {
    try {
        const db = await connectDB();
        const cursor = db.collection("honey").find()
        const result = await cursor.toArray()
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/honey/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("honey").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/honey/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const body = { ...req.body };
        delete body._id;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: body };

        const result = await db.collection("honey").updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});
app.delete("/honey/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("honey").deleteOne({
            _id: new ObjectId(req.params.id),
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



//Pickles data function
app.post('/pickles', async (req, res) => {
    try {
        const db = await connectDB();
        const newFood = req.body;
        const result = await db.collection("pickles").insertOne(newFood);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/pickles', async (req, res) => {
    try {
        const db = await connectDB();
        const cursor = db.collection("pickles").find()
        const result = await cursor.toArray()
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/pickles/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("pickles").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/pickles/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const body = { ...req.body };
        delete body._id;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: body };

        const result = await db.collection("pickles").updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});
app.delete("/pickles/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("pickles").deleteOne({
            _id: new ObjectId(req.params.id),
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


//Vegetables data
app.post('/Vegetables', async (req, res) => {
    try {
        const db = await connectDB();
        const newFood = req.body;
        const result = await db.collection("Vegetables").insertOne(newFood);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/Vegetables', async (req, res) => {
    try {
        const db = await connectDB();
        const cursor = db.collection("Vegetables").find()
        const result = await cursor.toArray()
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/Vegetables/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("Vegetables").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/Vegetables/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const body = { ...req.body };
        delete body._id;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: body };

        const result = await db.collection("Vegetables").updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});
app.delete("/Vegetables/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("Vegetables").deleteOne({
            _id: new ObjectId(req.params.id),
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


//Spices data
app.post('/Spices', async (req, res) => {
    try {
        const db = await connectDB();
        const newFood = req.body;
        const result = await db.collection("Spices").insertOne(newFood);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/Spices', async (req, res) => {
    try {
        const db = await connectDB();
        const cursor = db.collection("Spices").find()
        const result = await cursor.toArray()
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/Spices/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("Spices").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/Spices/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const body = { ...req.body };
        delete body._id;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: body };

        const result = await db.collection("Spices").updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});
app.delete("/Spices/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("Spices").deleteOne({
            _id: new ObjectId(req.params.id),
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


//AnimalBasedFood data
app.post('/AnimalBasedFood', async (req, res) => {
    try {
        const db = await connectDB();
        const newFood = req.body;
        const result = await db.collection("AnimalBasedFood").insertOne(newFood);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/AnimalBasedFood', async (req, res) => {
    try {
        const db = await connectDB();
        const cursor = db.collection("AnimalBasedFood").find()
        const result = await cursor.toArray()
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/AnimalBasedFood/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("AnimalBasedFood").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/AnimalBasedFood/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const body = { ...req.body };
        delete body._id;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: body };

        const result = await db.collection("AnimalBasedFood").updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
});
app.delete("/AnimalBasedFood/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("AnimalBasedFood").deleteOne({
            _id: new ObjectId(req.params.id),
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});




//Category data function
app.post('/categories', async (req, res) => {
    try {
        const db = await connectDB();
        const newFood = req.body;
        const result = await db.collection("categories").insertOne(newFood);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/categories', async (req, res) => {
    try {
        const db = await connectDB();
        const cursor = db.collection("categories").find()
        const result = await cursor.toArray()
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.delete("/categories/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;

        const result = await db.collection("categories").deleteOne({
            _id: new ObjectId(id),
        });

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



app.post("/cards", async (req, res) => {
    try {
        const db = await connectDB();
        const newCard = req.body;
        const result = await db.collection("cards").insertOne(newCard);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/cards", async (req, res) => {
    try {
        const db = await connectDB();
        const email = req.query.email;
        if (!email) {
            return res.status(400).send({ message: "Email required" });
        }
        const query = { email: email };
        const result = await db.collection("cards").find(query).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/cards/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("cards").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/cards/confirm', async (req, res) => {
    try {
        const db = await connectDB();
        const email = req.query.email;
        const filter = { email: email, status: 'pending' };
        const updateDoc = {
            $set: { status: 'Confirmed' }
        };
        const result = await db.collection("cards").updateMany(filter, updateDoc);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.delete('/cards/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("cards").deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});








//Orders
app.post("/order", async (req, res) => {
    try {
        const db = await connectDB();
        const newCard = req.body;
        const result = await db.collection("order").insertOne(newCard);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get("/order", async (req, res) => {
    try {
        const db = await connectDB();
        const email = req.query.email;
        let query = {};

        if (email) {
            query.userEmail = email;
        }

        const cursor = db.collection("order").find(query);
        const result = await cursor.toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get('/order/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("order").findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.patch('/order/:id', async (req, res) => {
    try {
        const db = await connectDB();
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

        const result = await db.collection("order").updateOne(query, update);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});
app.delete('/order/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await db.collection("order").deleteOne(query);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});






// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
// if (process.env.NODE_ENV !== "production") {
//     // const port = process.env.PORT || 3000;
//     app.listen(port, () => {
//         console.log(`Server running on port ${port}`);
//     });
// }
// module.exports = app;
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//     }
//     // module.exports = app;
// }
// module.exports = app;
// run().catch(console.dir);
module.exports = app;
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
