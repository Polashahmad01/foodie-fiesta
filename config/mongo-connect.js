const { MongoClient } = require("mongodb")
require("dotenv").config()

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster1.gz25i9e.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`

const getMongoConnection = async () => {
  const client = new MongoClient(MONGO_URI)
  await client.connect()
  const db = client.db(process.env.MONGO_DATABASE_NAME)

  return { client, db }
}

module.exports = getMongoConnection
