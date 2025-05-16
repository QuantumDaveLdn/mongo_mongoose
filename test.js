const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://davronbecki44:hzUaTAM9joZDqKs5@cluster0.2lqntyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    
    const database = client.db("myFirstDatabase");
    const collection = database.collection("users");
    
    // Insert a document
    const insertResult = await collection.insertOne({
      name: "John",
      email: "john@example.com"
    });
    console.log("Inserted document:", insertResult);
    
    // Find documents
    const findResult = await collection.find({}).toArray();
    console.log("Found documents:", findResult);
    
  } finally {
    await client.close();
  }
}

run().catch(console.error);