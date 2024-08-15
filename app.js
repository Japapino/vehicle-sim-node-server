const sqlite3 = require('sqlite3').verbose();
let sql;

// connect to db
const db = new sqlite3.Database('./vehicles.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the Vehicles database.');
});
// create table

// sql = `CREATE TABLE IF NOT EXISTS vehicles (id INTEGER PRIMARY KEY, make TEXT, model TEXT, year TEXT)`;
// db.run(sql);

// drop table
// sql = `DROP TABLE IF EXISTS vehicles`;
// db.run(sql); 

// insert data into table
// sql = `INSERT INTO vehicles (make, model, year) VALUES (?, ?, ?)`; // notice the ? placeholders filled in with values in []
// db.run(sql, ['Toyota', 'Corolla', '2019'], function(err) {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log(`Rows inserted ${this.changes}`);
// });

// query data from db
sql = `SELECT * FROM vehicles where id < 10`;     
db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
});

// update data in db
// sql = `UPDATE vehicles SET make = ? WHERE id = ?`;
// db.run(sql, ['Honda', 1], function(err) {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log(`Rows updated ${this.changes}`);
// });

// delete data from db
// sql = `DELETE FROM vehicles WHERE id = ?`;
// db.run(sql, [1], function(err) {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log(`Rows deleted ${this.changes}`);
// });

