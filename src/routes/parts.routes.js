const express = require('express');
const {
  getAllParts,
  getPartIdByName,
  createPart,
  getPart,
  updatePart,
  deletePart,
} = require('../controllers/parts.controller');
const canAccess = require('../middleware/auth.middleware');

const partsRoutes = express.Router();
/**
 * Express routes for Parts.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all parts. Evaluates to `/parts/`.
 */
partsRoutes.get('/', canAccess, getAllParts);
partsRoutes.get('/getPartIdByName/:partName', canAccess, getPartIdByName);

partsRoutes.post('/', canAccess, createPart);

/**
 * Routes for a part by id. Evalutes to `/parts/:partId`.
 */
partsRoutes
  .get('/:partId', canAccess, getPart) // GET http://locahost:3000/parts/:partId
  .put('/:partId', canAccess, updatePart)
  .delete('/:partId', canAccess, deletePart);

module.exports = partsRoutes;
