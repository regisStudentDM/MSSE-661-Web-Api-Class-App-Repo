const bcrypt = require('bcryptjs');
const connection = require('../db-config');
const query = require('../utils/query');
const {
  GET_ME_BY_USER_ID,
  GET_ME_BY_USER_ID_WITH_PASSWORD,
  UPDATE_USER,
} = require('../queries/user.queries');
const { serverError } = require('../utils/handlers');
const mysql = require('mysql');


exports.getMe = async (req, res) => {
  // verify valid token
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (req.user.id) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const user = await query(con, GET_ME_BY_USER_ID(req.user.id)).catch(
      serverError(res)
    );

    if (!user.length) {
      res.status(400).json({ msg: 'No user found.' });
    }
    res.status(200).json(user);
  }
};

exports.updateMe = async function (req, res) {
  // establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });

  console.log("REACHED LINE 41");


  // check for existing user first
  const user = await query(con, GET_ME_BY_USER_ID_WITH_PASSWORD(req.user.id)).catch(
    serverError(res)
  );

  // checked for password changed
  // SAME LOGIC AS CHECKING FOR A VALID PASSWORD
  const passwordUnchanged = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch((err) => {
      res.json(500).json({ msg: 'Invalid password!' });
      return;
    });

    console.log("REACHED LINE 60");


  if (!passwordUnchanged || req.body.username != user[0].username || req.body.email != user[0].email) {
    const passwordHash = bcrypt.hashSync(req.body.password);

    const username = mysql.escape(req.body.username);
    const eMail = mysql.escape(req.body.email);
    const pWord = mysql.escape(passwordHash);

    const result = await query(con, UPDATE_USER(username, eMail, pWord, user[0].user_id)).catch(
      serverError(res)
    );

    if (result.affectedRows > 0) {
      res.json({ msg: 'Updated succesfully!' });
      return;
    }
    res.status(500).json({ msg: 'Could not update user settings. Possible Duplicate Username Conflict' });
    return;
  }
  else{
    res.json({ msg: 'Nothing to update, values same as existing' });
    return;
  }
};
