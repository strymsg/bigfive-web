/**
 * Express server to avoid using vercel cli and run this /api in our own servers.
*/

const express = require('express');
const cors = require('cors');

const port = 4001;
const save = require('./save');
const result = require('./result');

const app = express();
app.use(express.json());
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/save', (req, res) => {
  console.log('POST to /api/save');
  console.log('-----------------');
  return save(req, res);
})

// app.listen(port, () => {
//   console.log(`/api app listening on port ${port}`);
// });

module.exports = app;