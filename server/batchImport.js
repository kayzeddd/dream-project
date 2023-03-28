const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { fakeData } = require("./data")

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dream_project")
    try {
        await client.connect()
        await db.collection("user_data").insertMany(fakeData)
        client.close()
    }
    catch(err){
        console.log(err)
    }
}

batchImport()