const bcrypt = require('bcryptjs');

const connection = require('../db-config');
const query = require('../utils/query');
const {
  GET_ME_BY_USER_ID,
  GET_ME_BY_USER_ID_WITH_PASSWORD,
  UPDATE_USER,
} = require('../queries/user.queries');

exports.getMe = async (req, res) => {
  // verify valid token
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (decoded.id) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const user = await query(con, GET_ME_BY_USER_ID, [req.body[0].user_id]).catch(
      (err) => {
        res.status(500).send({ msg: 'Could not find the user.' });
      }
    );

    if (!user.length) {
      res.status(400).send({ msg: 'No user found.' });
    }
    res.status(200).send(user);
  }
};

exports.updateMe = async function (req, res) {
  // establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check for existing user first
  const user = await query(con, GET_ME_BY_USER_ID_WITH_PASSWORD, [
    req.body.user_id,
  ]).catch((err) => {
    res.status(500);
    res.send({ msg: 'Could not retrieve user.' });
  });

  // checked for password changed
  // SAME LOGIC AS CHECKING FOR A VALID PASSWORD
  const passwordUnchanged = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch((err) => {
      res.json(500).json({ msg: 'Invalid password!' });
    });

  if (!passwordUnchanged || req.body.username != user[0].username || req.body.username != user[0].username) {
    const passwordHash = bcrypt.hashSync(req.body.password);

    const result = await query(con, UPDATE_USER, [
      req.body.username,
      req.body.email,
      passwordHash,
      user[0].user_id
    ]).catch((err) => {
      res.status(500).send({ msg: 'Could not update user settings.' });
    });

    if (result.affectedRows > 0) {
      res.json({ msg: 'Updated succesfully!' });
    }
    res.status(500).send({ msg: 'Could not update user settings.' });
  }
  else{
    res.json({ msg: 'Nothing to update...' });
  }
};
