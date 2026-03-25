const express = require('express');
const validateRequest = require('../middleware/validateRequest');
const {
  listClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientsController');
const {
  clientIdParamValidation,
  clientBodyValidation,
} = require('../validators/clientValidators');

const router = express.Router();

router.get('/', listClients);
router.get('/:id', clientIdParamValidation, validateRequest, getClientById);
router.post('/', clientBodyValidation, validateRequest, createClient);
router.put('/:id', clientIdParamValidation, clientBodyValidation, validateRequest, updateClient);
router.delete('/:id', clientIdParamValidation, validateRequest, deleteClient);

module.exports = router;
