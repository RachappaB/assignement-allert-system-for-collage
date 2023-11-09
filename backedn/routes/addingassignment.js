var express = require('express');
require('dotenv').config()
const fs = require('fs')

var router = express.Router();
const mysql = require('mysql2/promise');
// const ical = require('ical-generator');
var nodemailer = require('nodemailer')
const qrcode = require('qrcode-terminal');





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
      const { sub,text,link,deadline} = req.body;



      console.log("adding assignment ",sub); 
        let connection;
  try {
    connection = await pool.getConnection();
    const sql = 'INSERT INTO assignment (sub,text,link,deadline) VALUES (?, ?, ?, ?)';
    const values = [sub,text,link,deadline];

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

// this belove function to email all whatsapp
assign_to_all(sub,text,link,deadline)

});

module.exports = router;








async function  assign_to_all(sub,text,link,deadline)
{

   


    let connection;
  try {
    connection =  await pool.getConnection();
    const sql = 'SELECT gmail FROM student';
        const sql_whatsapp = 'SELECT phone FROM student';


    // const [rows] = await connection.execute(sql);
    //     const emailList = rows.map((row) => row.gmail);

    //     console.log(emailList);
    //     emailList.forEach((email) => {
    //         // belove code to call gmail
    //   send_gmail(email,sub,text,link,deadline);

      
    // });


 const [rows] = await connection.execute(sql_whatsapp);
        const phonelist = rows.map((row) => row.phone);

        console.log(phonelist);
        phonelist.forEach((phone) => {
            // belove code to call gmail
      // send_whatsapp(phone,sub,text,link,deadline);

      
    });


} catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    if (connection) {
      connection.release();
    }

}

}

function send_gmail(email,sub,text,link,deadline)
{
    var transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email,
      pass: process.env.Password
    },
    port: 465,
    host: 'smtp.gmail.com'
  });
  var mailOptions = {
    from: process.env.Email,
    to: email,
    subject: sub,
    html: `
      <p><h2>Assignment Topic: ${sub}</h2></p>
      <p>Assignment Description: ${text}</p>
      <p>Assignment Data: Some important data goes here...</p>
      <p>Link: <a href="${link}">Visit Example Website</a></p>
      <p>Deadline: ${deadline}</p>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


 