const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
let csv = require('csv-parser');

// Open a SQLite database
let db = new sqlite3.Database('./vehicles.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create a table for the CSV data
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_year TEXT,
    vehicle_make TEXT,
    vehicle_model TEXT
  )`);
});

// Function to insert data into the database
const insertData = (data) => {
  db.run(`INSERT INTO vehicles (vehicle_year, vehicle_make, vehicle_model) VALUES (?, ?, ?)`,
    [data.vehicle_year, data.vehicle_make, data.vehicle_model],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      // console.log(`Inserted row with ID: ${this.lastID}`);
      // console.log('make: ', data.vehicle_make, 'model: ', data.vehicle_model, 'year: ', data.vehicle_year);
    }
  );
};

// Read the CSV file and insert data into the database
fs.createReadStream('./src/public/data/vehicle_data_with_id.csv')
  .pipe(csv({
    ski_empty_lines: true,
    columns: true,
    bom: true
  }
  ))
  .on('data', (row) => {
    insertData(row);
  })
  .on('error', (err) => {
    console.log('=== ERROR ===');
    console.error(err.message);
  })
  .on('end', () => {
    console.log('CSV file successfully processed and data inserted into the database.');
    
    queryDataByMake('1995', 'Acura');
    
    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  });

const queryDataByMake = (year, make) => {
  sql = `SELECT * FROM vehicles where vehicle_year = '${year}' and vehicle_make = '${make}'`;
  
  console.log('sql: ', sql); 
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });

}

// first select year and return vehicle makes, 
// selecting vehicle make then filter make data for models

// const result = queryDataByMake('1992', 'Acura'); 
// console.log('RESULT: ', result); 