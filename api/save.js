const connectToDb = require('./lib/connect-to-db')
const validate = require('./lib/validate-test')
const dbCollection = process.env.MONGODB_COLLECTION || 'results';

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.send('ok!')
    return
  }
  const { body: payload } = req
  // console.log(Object.keys(req));
  // console.log(payload);
  // if (!payload) {
  //   res.status(400).json({ type: 'error', message: 'Not a valid payload' })
  //   return
  // }

  // const { error } = validate(payload)
  // const isValid = !error

  // if (!isValid) {
  //   res.status(400).json({ type: 'error', message: error })
  //   return
  // }

  try {
    console.log('Connecting to mongo...');
    const db = await connectToDb();
    console.log(db);
    const collection = db.collection(dbCollection);
    const data = await collection.insertOne(payload);
    console.log();
    res.send({ id: data.insertedId })
    return
  } catch (error) {
    console.log('ERROR connecting to mongo');
    console.log(error);
    res.status(500).json({ type: 'error', message: error.message });
  }
}
