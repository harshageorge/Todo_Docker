CREATE TABLE IF NOT EXISTS `todos` (
  `id` INT NOT NULL DEFAULT 1,
  `title` VARCHAR(100) NULL,
  `todo_status` TINYINT NULL,
  PRIMARY KEY (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

INSERT INTO todos(
       id,
       title, 
       todo_status) 
VALUES(
       1,
       "Go for shopping", 
        false
);
INSERT INTO todos(
       id,
       title, 
       todo_status) 
VALUES(
       2,
       "Go for a walk", 
        false
);
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 
flush privileges;
