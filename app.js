const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config.js");
const compiler = webpack(config);
const cors = require("cors");
const puppeteer = require("puppeteer-core");

const app = express();
const PORT = 3000;
const sqlite3 = require("sqlite3").verbose();

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

const getEstimate = async ( year, make, model ) => { 
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false, 
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const link =
    `https://www.edmunds.com/inventory/srp.html?year=${year}-${year}&make=${make}&model=${make}%7C${model}`;

  await page.goto(link, { waitUntil: "networkidle2", timeout: 60000 });

  const data = await page.evaluate(() => {
    const scriptTag = document.querySelector(
      'script[type="application/ld+json"'
    ); 
    return scriptTag ? scriptTag.innerText : null;
  });

  const filteredStringData = (data) => {
    const jsonData = JSON.parse(data);
    const filteredData = jsonData.filter(item => item['@type'] === 'Vehicle');
    return formatData(filteredData);
  };

  const resultData = []; 

  const formatData = (data) => {
    data.forEach((item) => {
      resultData.push({
        "itemCondition": item["itemCondition"] ?? undefined,
        "price": item["offers"]["price"] ?? undefined,
        "mileage": item["mileageFromOdometer"] ?? undefined,
        "configuration": item['vehicleConfiguration'] ?? undefined,
        "knownVehicleDamages": item['knownVehicleDamages'] ?? undefined,
        "numberOfPreviousOwners": item['numberOfPreviousOwners'] ?? undefined,
        "image": item["image"]
      })
    })
  }; 

  filteredStringData(data);

  await browser.close();

  return resultData; 

};

app.get("/estimate/:year/:make/:model", (req, res) => {

  const { year, make, model } = req.params;

  console.log('params: ', req.params); 

  const resultData = getEstimate(year, make, model); 

  res.send(resultData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/hello", function (req, res) {
  res.send({
    hello: "Hello World",
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/page.html");
});

async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage();

  await page.goto("https://www.youtube.com/feed/trending");

  const youtubeTrending = await page.evaluate(() => {
    const trendingElements = document.querySelectorAll("#video-title");

    return Array.from(trendingElements).map((element) => {
      const link = element.href;
      return { link };
    });
  });

  await browser.close();

  app.get("/trending", (req, res) => {
    res.send(youtubeTrending);
  });
};

