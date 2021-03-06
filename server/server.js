const express = require('express');
const path = require('path');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
const Url = require('./models/url');
const validUrl = require('valid-url');
const shortid = require('shortid');
const process = require('process');
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 5000;

// const url = new Url({
//   urlCode: '2',
//   longUrl: 'abc',
//   shortUrl: 'xyz',
//   date: new Date(),
// });
// url.save();

var __dirname = path.dirname(__filename);

console.log(process.cwd());
console.log(__filename);
app.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '/public', '/index.html'));
  } catch (err) {
    res.send('Server Not Working');
  }
});

app.post('/url', async (req, res) => {
  const { longUrl } = req.body;
  // const baseUrl = 'http://localhost:5000';
  const baseUrl = 'https://ak-surl.herokuapp.com';

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

app.get('/:code', async (req, res) => {
  const code = req.params.code;
  try {
    let url = await Url.findOne({ urlCode: code });
    let longUrl = url.longUrl;
    // res.send(longUrl);
    res.redirect(longUrl);
  } catch (error) {
    res.status(400).send(error);
  }

  // res.send('Hello from server' + req.params.code);
});
app.listen(PORT, () => console.log(`server running at port  ${PORT}`));
