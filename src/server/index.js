import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'www')));

app.get('/', (req, res) => {
  // static html should be server instead
  res.send('hello');
});

const server = app.listen(4000, () => {
  console.log('Listening on port %d', server.address().port);
});