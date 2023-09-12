const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const jsonFilePath = './Chart.json';
const URI = 'mongodb://0.0.0.0:27017/mydb'; 
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const DataModel = require('./DataModel');
async function insertData() {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Insert the JSON data into the MongoDB collection
    const result = await DataModel.insertMany(jsonData,{maxTimeMS:30000});

    console.log(`Successfully inserted ${result.length} records into the database.`);
  } catch (error) {
    console.error('Error inserting data:', error);
  } 
}
insertData();
router.get('/api/data',async(req,res)=>{
    try {
        const allData = await DataModel.find({});
        res.json(allData);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } 
})
module.exports = router
