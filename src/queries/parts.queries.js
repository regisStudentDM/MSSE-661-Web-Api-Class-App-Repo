exports.CREATE_PARTS_TABLE = `CREATE TABLE IF NOT EXISTS parts(
    part_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    part_name varchar(255) NOT NULL,
    part_unit varchar(255) NOT NULL,
    PRIMARY KEY (part_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
    UNIQUE KEY (user_id, part_name)
  )`;
  
  // Get every part
  exports.ALL_PARTS = (userId) => `SELECT * FROM parts WHERE user_id = ${userId}`;
  
  // Get a single part by id
  exports.SINGLE_PART = (userId, partId) =>
    `SELECT * FROM parts WHERE user_id = ${userId} AND part_id = ${partId}`;
  
    exports.PART_ID_BY_USER_ID_AND_NAME = (userId, partName) =>
    `SELECT part_id FROM parts WHERE user_id = ${userId} AND part_name = ${partName}`;
    
  /**
   * Insert follows syntax:
   * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
   *    VALUES(<value1>, <value2>, <value3>, ...)
   *
   * Create a new part in `parts` table where
   * - column names match the order the are in the table
   * - `?` allow us to use params in our controllers
   */
  exports.INSERT_PART = (userId, partName, partUnit) =>
    `INSERT INTO parts (user_id, part_name, part_unit) VALUES (${userId}, ${partName}, ${partUnit})`;
  
  /**
   * Update follows syntax:
   * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
   *
   * NOTE: omitting `WHERE` will result in updating every existing entry.
   */
  exports.UPDATE_PART = (userId, partId, newValues) =>
    `UPDATE parts SET ${newValues} WHERE user_id = ${userId} AND part_id = ${partId}`;
  
  // Delete a part by id
  exports.DELETE_PART = (userId, partId) =>
    `DELETE FROM parts WHERE user_id = ${userId} AND part_id = ${partId}`;
  