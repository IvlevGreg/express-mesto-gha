const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use((req, res, next) => {
  req.user = {
    _id: '6485db5c0750de16a844b990',
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected!'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
