const express = require('express');
const mongoose = require('mongoose');
const URI = 'mongodb://0.0.0.0:27017/mydb'; 

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

global.__basedir = __dirname;

db.on('error', (err) => {
  console.error('DB Connection Error:', err); // Use console.error to log the error
});

db.once('open', () => {
  console.log('Connection Established');
});

const app = express();
const cors = require('cors');

require('./DataModel');

app.use(cors());
app.use(express.json());
app.use(require('./DataRoute'));


app.listen(2000, () => {
  console.log('Server Running');
});