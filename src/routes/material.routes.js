const controllers = require('../controllers/material.controller');
const express = require('express');

const materialRoutes = express.Router();

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

materialRoutes.get('/parts/getAllParts', controllers.getAllParts); // GET // http://localhost:3000/material/parts/getAllParts
materialRoutes.get('/parts/getSpecifiedPart', controllers.getSpecifiedPart); // GET // http://localhost:3000/material/parts/getSpecifiedPart

materialRoutes.post('/parts/insertPart', controllers.insertPart); // POST // http://localhost:3000/material/parts/insertPart

materialRoutes.put('/parts/editPart', controllers.editPart); // PUT // http://localhost:3000/material/parts/editPart

materialRoutes.delete('/parts/deletePart', controllers.deletePart); // DELETE // http://localhost:3000/material/parts/deletePart

module.exports = materialRoutes;
