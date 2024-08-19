const sqlite3 = require('sqlite3').verbose();
let sql;

// connect to db
const db = new sqlite3.Database('./vehicles.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the Vehicles database.');
});

sql = `DROP TABLE IF EXISTS vehicles`;
db.run(sql);

console.log('Table vehicles dropped.');