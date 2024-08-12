const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = 6969;

// setup database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// setup schema
const leaderboardSchema = new mongoose.Schema({
  name: String,
  entry: String,
  time: Number,
  attempts: Number
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);


app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(__dirname + "/static/leaderboard.html");
});

// static files on /static/
app.use('/static', express.static('static'));

app.get('/api/leaderboard', async (req, res) => {
  // get data from database
  // return data
  let q = Leaderboard.find();
  q.sort({ attempts: 1, time: 1 });
  let data = await q.exec();
  // console.log(data);
  res.json(data);
});

app.post('/api/leaderboard', async (req, res) => {
  // get data from request
  // json data
  const data = req.body;
  // console.log(data);
  let q = Leaderboard.findOne({ entry: data.entry });
  let result = await q.exec()
  if (result) {
    if (result.attempts > data.attempts) {
      result.attempts = data.attempts;
      result.time = data.time;
      result.save();
    } else if (result.attempts == data.attempts && result.time > data.time) {
      result.time = data.time;
      result.save();
    }
  } else {
    const newEntry = new Leaderboard({
      name: data.name,
      entry: data.entry,
      time: data.time,
      attempts: data.attempts
    });
    newEntry.save();
  }

  // save data to database
  // return status
  res.json({
    status: 'success'
  });
});


db.once('open', () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});