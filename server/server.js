const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
const Url = require('./models/url');
const validUrl = require('valid-url');
const shortid = require('shortid');
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
// const url = new Url({
//   urlCode: '2',
//   longUrl: 'abc',
//   shortUrl: 'xyz',
//   date: new Date(),
// });
// url.save();
app.get('/url/:code', (req, res) => {
  res.send('Hello from server' + req.params.code);
});

app.post('/url', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = 'http://localhost:5000';

  if (!validUrl.isUri(baseUrl)) {
    res.status(401).json('Invalid base Url');
  }
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Server Error');
    }
  }
});

app.get('/url', async (req, res) => {
  try {
    const data = await Url.find({});
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`server running at port  ${PORT}`));