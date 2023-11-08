
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
    sub VARCHAR(25) NOT NULL,
    `text` VARCHAR(50) NOT NULL,
    link VARCHAR(50) NOT NULL,
    deadline DATETIME NOT NULL,
    PRIMARY KEY (sub)
);

CREATE TABLE submited (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sub VARCHAR(5) NOT NULL,
	SRN VARCHAR(20) NOT NULL,
    submit binary default false,
	FOREIGN KEY (sub) REFERENCES assignment(sub),
    FOREIGN KEY (SRN) REFERENCES student(SRN)
    );
    
    
    DELIMITER //
CREATE TRIGGER assignment_insert_trigger AFTER INSERT ON assignment
FOR EACH ROW
BEGIN
  INSERT INTO submited (sub, SRN) 
  SELECT NEW.sub, s.srn
  FROM student s;
END;
//
DELIMITER ;


