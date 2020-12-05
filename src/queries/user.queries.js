exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

exports.GET_ME_BY_USER_ID = (uID) => `SELECT user_id, username, email FROM users WHERE user_id = ${uID}`; // don't return the password

exports.GET_ME_BY_USERNAME = (uName) => `SELECT user_id, username, email FROM users WHERE username = ${uName}`;

exports.GET_ME_BY_USER_ID_WITH_PASSWORD = (uID) => `SELECT * FROM users WHERE user_id = ${uID}`;

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = (uName) => `SELECT * FROM users WHERE username = ${uName}`;

exports.INSERT_NEW_USER = (uName, eml, pWord) => `INSERT INTO users (username, email, password) VALUES (${uName}, ${eml}, ${pWord})`;

exports.UPDATE_USER = (uName, eml, pWord, uID) => `UPDATE users SET username = ${uName}, email = ${eml}, password = ${pWord} WHERE user_id = ${uID}`;
