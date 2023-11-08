var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');
// const ical = require('ical-generator');

const pool = mysql.createPool({
  host: "localhost",
  database:'gmail_whatsapp',
  user: "root",
  password: "root",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



/* GET users listing. */
router.post('/', async (req, res) =>{
      const { name,srn,phone,gmail } = req.body;



      console.log("adding student ",name); 
        let connection;
  try {
    connection = await pool.getConnection();
    const sql = 'INSERT INTO student (name,srn,phone,gmail) VALUES (?, ?, ?, ?)';
    const values = [name,srn,phone,gmail];

    const [rows] = await connection.execute(sql, values);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    if (connection) {
      connection.release();
    }
}
      res.send('respond with a resource');

});

module.exports = router;