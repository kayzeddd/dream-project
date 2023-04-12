const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { createUsersAndDreams } = require("./data")

const data = createUsersAndDreams();

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("dream_project")
    try {
        await client.connect()
        await db.collection("all_dreams").insertMany(data.allDreams)
        await db.collection("users_data").insertMany(data.userArray)
        client.close()
    }
    catch(err){
        console.log(err)
    }
}

batchImport()