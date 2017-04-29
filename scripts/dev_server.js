import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/products', function (req, res) {
  res.json([
    {"id": 1, "name":"Joe Rocket Atomic 5.0", "desc":"multi-season textile"},
    {"id": 2, "name":"Alpinestarts GP Plus", "desc":"perforated leather jacket"},
    {"id": 3, "name":"Dainese Super Speed", "desc":"textile jacket"}
  ]);
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
