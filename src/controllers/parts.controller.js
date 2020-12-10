const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_PARTS,
  SINGLE_PART,
  PART_ID_BY_USER_ID_AND_NAME,
  INSERT_PART,
  UPDATE_PART,
  DELETE_PART,
} = require('../queries/parts.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/parts
exports.getAllParts = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all parts
  const parts = await query(con, ALL_PARTS(req.user.id)).catch(
    serverError(res)
  );

  // [] === true, 0 === false
  if (!parts.length) {
    res.status(200);
    res.json({ msg: 'No parts available for this user.' });
  }
  else{
    res.json(parts);
  }
};

// http://localhost:3000/parts/:partId
exports.getPart = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query all part
  const part = await query(
    con,
    SINGLE_PART(req.user.id, req.params.partId)
  ).catch(serverError(res));

  if (!part.length) {
    res.status(400).json({ msg: 'No parts available for this user.' });
  }
  else{
    res.json(part);
  }
};

// http://localhost:3000/getPartIdByName/:partName
exports.getPartIdByName = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const partName = mysql.escape(req.params.partName);

  // query all part
  const retrievedID = await query(
    con,
    PART_ID_BY_USER_ID_AND_NAME(req.user.id, partName)
  ).catch(serverError(res));

  if (retrievedID){
    if (retrievedID.length !== 1){
      res.status(500).json({ msg: 'Could not find part with that name, for this user.', userid: String(req.user.id), part_name: String(partName)});
      return;
    } else {
      res.json(retrievedID);
      return;
    }
  } else{
    res.status(500).json({ msg: 'Error in part lookup.' });
    return;
  }
};


// http://localhost:3000/parts
/**
 * POST request -
 * {
 *  name: 'A part name'
 * }
 */
exports.createPart = async (req, res) => {
  // verify valid token
  const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (user.id) {
    // establish connection
    const con = await connection().catch((err) => {
      throw err;
    });

    // query add part
    const partName = mysql.escape(req.body.part_name);
    const partUnit = mysql.escape(req.body.part_unit);
    const result = await query(con, INSERT_PART(user.id, partName, partUnit)).catch(
      serverError(res)
    );

    if(result){
      if (result.affectedRows !== 1) {
        res
          .status(500)
          .json({ msg: `Unable to add part: ${req.body.part_name}` });
      }
      else{
        res.status(200).json({ msg: 'Added part successfully!' });
        return;
      }    
    }
  }
  else{
    res
    .status(500)
    .json({ msg: `Do not have permission to add this part: ${req.body.part_name}` });
  }

};

const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [part_name, status].map()
    (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 part name'
  );

  values.join(', '); // make into a string
  return values;
};

// http://localhost:3000/parts/1
/**
 * PUT request -
 * {
 *  name: 'A part name',
 *  state: 'completed'
 * }
 */
exports.updatePart = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  // query update part
  const result = await query(
    con,
    UPDATE_PART(req.user.id, req.params.partId, values)
  ).catch(serverError(res));
  
  if (result){
    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to update part: '${req.body.part_name}'` });
        return;
    }
    else{
      res.status(200).json(result);
      return;
    }
  }
  else{
    res.status(500).json({ msg: `Unable to update part: '${req.body.part_name}'` });
  }

};

// http://localhost:3000/parts/1
exports.deletePart = async (req, res) => {
  // establish connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // query delete part
  const result = await query(
    con,
    DELETE_PART(req.user.id, req.params.partId)
  ).catch(serverError(res));

  if(result){
    if (result.affectedRows !== 1) {
      res.status(500).json({ msg: `Unable to delete part at: ${req.params.partId}` });
      return;
    }
    else{
      res.status(200).json({ msg: 'Deleted successfully.' });
      return;
    }
  } else{
    res.status(500).json({ msg: `Unable to delete part at: ${req.params.partId}` });
    return;
}

};
