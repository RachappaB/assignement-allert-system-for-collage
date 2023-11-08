
drop database gmail_whatsapp;
create database gmail_whatsapp;
use  gmail_whatsapp;
show tables;

 
 CREATE TABLE student(
 name VARCHAR(20) NOT NULL,
 srn VARCHAR(20) NOT NULL,
 phone varchar(10) NOT NULL,
 gmail VARCHAR(30) NOT NULL,
 primary key(SRN)
 );
 
CREATE TABLE assignment (
    a_id VARCHAR(5) NOT NULL,
    sub VARCHAR(25) NOT NULL,
    `text` VARCHAR(50) NOT NULL,
    link VARCHAR(50) NOT NULL,
    deadline DATETIME NOT NULL,
    PRIMARY KEY (a_id)
);

CREATE TABLE submited (
    id INT AUTO_INCREMENT PRIMARY KEY,
    a_id VARCHAR(5) NOT NULL,
	SRN VARCHAR(20) NOT NULL,
	FOREIGN KEY (a_id) REFERENCES assignment(a_id),
    FOREIGN KEY (SRN) REFERENCES student(SRN)
    );
    

