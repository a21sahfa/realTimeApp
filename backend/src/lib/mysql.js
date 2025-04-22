import mysql from 'mysql2';
//connects database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'syp9393.',
    database: 'chatapp'
});

db.connect(err => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }
    console.log("Connected to MySQL!");
});

export default db;