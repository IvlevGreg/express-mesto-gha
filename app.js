const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected!'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
