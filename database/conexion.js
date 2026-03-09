const mysql = require('mysql');
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'sgpo'
        
    }
);

db.connect( (err) => {
    if(err){throw err;}
    console.log('Base de datos conectada');
});

module.exports = db;