exports.CREATE_PARTS_TABLE = `CREATE TABLE IF NOT EXISTS parts(
    part_number int NOT NULL,
    part_description varchar(255) NOT NULL,
    part_unit varchar(255) DEFAULT 'EACH',
    PRIMARY KEY (part_number)
  )`;
  
  exports.SELECT_ALL_PARTS = `SELECT * FROM parts`;
  
  exports.SELECT_PART_BY_PART_NUMBER = `SELECT * FROM parts WHERE part_number = ?`;
  
  exports.INSERT_PART = `INSERT INTO parts (part_number, part_description, part_unit) VALUES (?, ?, ?)`;
  
  exports.EDIT_PART = `UPDATE parts SET part_description = ?, part_unit = ? WHERE part_number = ?`;
  
  exports.DELETE_PART = `DELETE FROM parts WHERE part_number = ?`;
  