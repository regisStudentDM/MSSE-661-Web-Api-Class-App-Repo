const con = require('../db-config');
const queries = require('../queries/material.queries');


exports.getAllParts = function(req, res) {
  con.query(queries.SELECT_ALL_PARTS, function(err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.getSpecifiedPart = function(req, res) {
  con.query(queries.SELECT_PART_BY_PART_NUMBER, [req.body.part_number], function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.insertPart = function(req, res) {
  con.query(queries.INSERT_PART, [req.body.part_number, req.body.part_description, req.body.part_unit], function(err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Number of parts inserted: ' + result.affectedRows });
  });
};

exports.editPart = function(req, res) {
  con.query(
    queries.EDIT_PART,
    [req.body.part_description, req.body.part_unit, req.body.part_number],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

exports.deletePart = function(req, res) {
  con.query(queries.DELETE_PART, [req.body.part_number], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Part Deleted successfully.' });
  });
};
