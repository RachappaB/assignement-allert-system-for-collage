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



//  submitting assignment
router.post("/submit", async (req, res) => {
  const { srn, sub} = req.body;

  let connection;
  try {
    connection = await pool.getConnection();
    const sql ="UPDATE submited SET submit = 1 WHERE SRN = '" +srn +"' AND sub = '"+sub+"'" ;

    const [rows] = await connection.execute(sql);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
  res.send("respond with a resource");
});



// to check pendingrs

//  submitting assignment
router.post("/Student_page", async (req, res) => {
  const { srn } = req.body;

  let connection;
        const not_submit_list =[];
        const submit_list =[];
  try {

    connection = await pool.getConnection();
    const sql =
      "SELECT a.sub, a.text, a.link, a.deadline FROM assignment a JOIN submited s ON a.sub = s.sub WHERE s.SRN = '" +
      srn +
      "' AND s.submit = 0;";

    const [rows] = await connection.execute(sql);
            const not_submit_list = rows.map((row) => console.log(row));

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
    try {
      connection = await pool.getConnection();
      const sql =
        "SELECT a.sub, a.text, a.link, a.deadline FROM assignment a JOIN submited s ON a.sub = s.sub WHERE s.SRN = '" +
        srn +
        "' AND s.submit = 1;";

      const [rows] = await connection.execute(sql);
      const submit_list = rows.map((row) => console.log(row));

      console.log("Data inserted successfully");
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  res.send({not_submit_list,submit_list});
});
module.exports = router;
