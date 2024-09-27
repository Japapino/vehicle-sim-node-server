const express = require("express");
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');
const compiler = webpack(config);
const cors = require('cors')

const app = express();
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();

app.use(cors()); 
app.use(express.json());

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

let db = new sqlite3.Database("./vehicles.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.get("/vehicles/:year", (req, res) => {
  const { year } = req.params;
  const query = `SELECT DISTINCT vehicle_make FROM vehicles WHERE vehicle_year = ?`;
  db.all(query, [year], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

// get models based on year and make
app.get("/vehicles/:year/:make", (req, res) => {
  const { year, make } = req.params;
  const query = `SELECT DISTINCT vehicle_model FROM vehicles WHERE vehicle_year = ? AND vehicle_make = ?`;

  db.all(query, [year, make], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ vehicles: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
