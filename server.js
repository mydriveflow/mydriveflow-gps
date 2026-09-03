const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

app.use(bodyParser.json());

let db;

async function start() {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  db = client.db();

  // Receive GPS points
  app.post('/location', async (req, res) => {
    const { lat, lng, timestamp, instructorId, lessonId } = req.body;

    await db.collection('gps_points').insertOne({
      lat,
      lng,
      timestamp,
      instructorId,
      lessonId
    });

    res.status(200).send('GPS saved');
  });

  // Start recording
  app.post('/gps/start', async (req, res) => {
    const { instructorId, lessonId } = req.body;

    await db.collection('gps_status').updateOne(
      { instructorId },
      { $set: { recording: true, lessonId } },
      { upsert: true }
    );

    res.send('Recording started');
  });

  // Stop recording
  app.post('/gps/stop', async (req, res) => {
    const { instructorId } = req.body;

    await db.collection('gps_status').updateOne(
      { instructorId },
      { $set: { recording: false } }
    );

    res.send('Recording stopped');
  });

  // Check recording status
  app.get('/gps/status', async (req, res) => {
    const { instructorId } = req.query;

    const status = await db.collection('gps_status').findOne({ instructorId });

    res.json(status || { recording: false });
  });

  // Fetch GPS history
  app.get('/gps/history', async (req, res) => {
    const { instructorId, from, to } = req.query;

    const points = await db.collection('gps_points')
      .find({
        instructorId,
        timestamp: { $gte: from, $lte: to }
      })
      .toArray();

    res.json(points);
  });

  app.listen(process.env.PORT || 3000);
}

start();
