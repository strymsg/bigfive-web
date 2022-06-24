const MongoClient = require('mongodb').MongoClient

let cachedDb = null

const uri = process.env.MONGODB_URI || 'mongodb://mongo:mongo@localhost:27017/results';

module.exports = async () => {
  if (cachedDb) return cachedDb
  console.log('Connecting to mongo DB')
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  const db = await client.db(new URL(uri).pathname.substr(1))

  cachedDb = db

  return db
}
